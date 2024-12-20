import NDK, {
  NDKRelay,
  NDKEvent,
  type NDKUserProfile,
} from '@nostr-dev-kit/ndk';
import {
  EventSchema,
  type Filter,
  ProfileSchema,
  ProxySchema,
  RelaysSchema,
} from '@repo/schemas/nostr';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import morgan from 'morgan';
// @ts-ignore
import { getPublicKey, nip05, nip19, verifyEvent } from 'nostr-tools';

const defaultRelays = [
  'wss://relay.nostr.band',
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://nostr.wine',
  'wss://nostr.mom',
  'wss://e.nos.lol',
];
export const createServer = (): Express => {
  const app = express();
  const activePubkey =
    '1739d937dc8c0c7370aa27585938c119e25c41f6c441a5d34c6d38503e3136ef';

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    })
    .get('/', async (req, res) => {
      const urlSearchParams = new URLSearchParams(
        req.query as Record<string, string>
      );

      if (urlSearchParams.size === 0 && !Object.keys(req.body).length) {
        return res
          .status(200)
          .sendFile('index.html', { root: `${__dirname}/../pages` });
      }

      let parsed = ProxySchema.safeParse(req.body);
      if (!parsed.success) {
        // Check url search params
        const urlSearchParams = new URLSearchParams(
          req.query as Record<string, string>
        );
        if (urlSearchParams.size === 0) {
          return res.status(200).send('Welcome to Nostr Http Proxy');
        }
        const relays = urlSearchParams.getAll('relay');
        const filterStringArrayKeys = ['ids', 'authors'];

        const filter: Filter = {};
        urlSearchParams.forEach((value, key) => {
          console.log('KEY', key);
          if (filterStringArrayKeys.includes(key) || key.match(/^#d$/)) {
            // @ts-ignore
            if (filter[key]) {
              // @ts-ignore
              filter[key].push(value);
            } else {
              // @ts-ignore
              filter[key] = [value];
            }
          } else if (key === 'kinds') {
            if (filter.kinds) {
              filter.kinds.push(Number(value));
            } else {
              filter.kinds = [Number(value)];
            }
          } else if (key === 'until') {
            filter.until = Number(value);
          } else if (key === 'since') {
            filter.since = Number(value);
          } else if (key === 'limit') {
            filter.limit = Number(value);
          }
        });

        parsed = ProxySchema.safeParse({
          relays,
          filter,
        });

        if (!parsed.success) {
          return res.status(400).json({
            message: 'Invalid request',
            error: parsed.error.message,
          });
        }
      }
      if (Object.keys(parsed.data?.filter || {}).length === 0) {
        return res
          .status(400)
          .json({ message: 'Invalid request', error: 'No filter provided' });
      }
      const ndk = new NDK({
        explicitRelayUrls: parsed.data.relays?.length
          ? parsed.data.relays
          : defaultRelays,
      });
      await ndk.connect(2000);
      const events = await ndk.fetchEvents(
        {
          ...parsed.data.filter,
        },
        {
          skipVerification: true,
        }
      );
      const eventsArray = Array.from(events).map((event) => event.rawEvent());
      return res.json(eventsArray);
    })
    .post('/', async (req, res) => {
      const parsed = ProxySchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(405)
          .json({ message: 'Invalid request', error: parsed.error.message });
      }
      console.log('PARSED', parsed.data);
      const ndk = new NDK({
        explicitRelayUrls: parsed.data.relays?.length
          ? parsed.data.relays
          : defaultRelays,
      });
      await ndk.connect();
      const events = await ndk.fetchEvents({
        ...parsed.data.filter,
      });
      const eventsArray = Array.from(events).map((event) => event.rawEvent());
      return res.json(eventsArray);
    })
    .post('/event', async (req, res) => {
      const parsed = EventSchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(400)
          .json({ message: 'Invalid request', error: parsed.error.message });
      }
      const eventData = parsed.data;
      const isVerified = verifyEvent(eventData);
      if (!isVerified) {
        return res
          .status(400)
          .json({ message: 'Invalid request', error: 'Event is not Valid' });
      }
      let relays: string[] = [];
      const relaysInBody = RelaysSchema.safeParse(req.body);
      if (relaysInBody.success) {
        relays = relaysInBody.data.relays;
      } else {
        // Check url search params
        const urlSearchParams = new URLSearchParams(
          req.query as Record<string, string>
        );
        relays = urlSearchParams.getAll('relay');
      }
      if (relays.length === 0) {
        relays = defaultRelays;
      }

      const ndk = new NDK({
        explicitRelayUrls: relays,
      });
      try {
        await ndk.connect(2000);
        const ndkEvent = new NDKEvent(ndk, eventData);
        const response = await ndkEvent.publish();
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          message: 'Error publishing event',
          error: error,
        });
      }
    })
    .get('/feed/:pubkey', async (req, res) => {
      const pubkey = req.params.pubkey;
      const ndk = new NDK({
        explicitRelayUrls: defaultRelays,
      });
      await ndk.connect();
      try {
        const user = ndk.getUser({
          pubkey,
        });
        const contactList = await user.follows();
        const feed = await ndk.fetchEvents({
          kinds: [1],
          authors: Array.from(contactList).map((contact) => contact.pubkey),
          limit: 100,
        });
        const feedArray = Array.from(feed).map((event) => event.rawEvent());
        return res.json(feedArray);
      } catch (err) {
        return res.status(404).json({ message: 'User not found' });
      }
    })
    .get('/:identifier', async (req, res) => {
      const identifier = req.params.identifier;
      const ndk = new NDK({
        explicitRelayUrls: defaultRelays,
      });
      await ndk.connect();
      try {
        let profile: NDKUserProfile | undefined;
        let pubkey = '';

        if (identifier.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          // regex check for NIP-05
          const nip05Response = await nip05.queryProfile(identifier);
          if (nip05Response) {
            pubkey = nip05Response.pubkey;
            const user = ndk.getUser({
              pubkey,
            });
            await user.fetchProfile();
            profile = user.profile;
          }
        } else if (identifier.startsWith('n')) {
          const decode = nip19.decode(identifier);
          if (decode.type === 'npub') {
            pubkey = decode.data;
            const user = ndk.getUser({
              pubkey,
            });
            await user.fetchProfile();
            profile = user.profile;
          } else if (decode.type === 'nprofile') {
            const nprofile = decode.data;
            if (nprofile.relays) {
              for (const relayUrl of nprofile.relays) {
                ndk.pool.addRelay(new NDKRelay(relayUrl));
              }
              await ndk.connect();
            }
            pubkey = nprofile.pubkey;
            const user = ndk.getUser({
              pubkey,
            });
            await user.fetchProfile();
            profile = user.profile;
          } else if (decode.type === 'note') {
            const noteId = decode.data;
            const event = await ndk.fetchEvent(noteId);
            return res.json(event?.rawEvent());
          } else if (decode.type === 'naddr') {
            const naddr = decode.data;
            const event = await ndk.fetchEvent({
              kinds: [naddr.kind],
              authors: [naddr.pubkey],
              '#d': [naddr.identifier],
            });
            return res.json(event?.rawEvent());
          } else if (decode.type === 'nevent') {
            const nevent = decode.data;
            if (nevent.relays) {
              for (const relayUrl of nevent.relays) {
                ndk.pool.addRelay(new NDKRelay(relayUrl));
              }
              await ndk.connect();
            }
            const event = await ndk.fetchEvent({
              ids: [nevent.id],
            });
            return res.json(event?.rawEvent());
          } else if (decode.type === 'nsec') {
            const nsec = decode.data;
            pubkey = await getPublicKey(nsec);
            const user = ndk.getUser({
              pubkey,
            });
            await user.fetchProfile();
            profile = user.profile;
          }
        } else {
          pubkey = identifier;
          const user = ndk.getUser({
            pubkey,
          });
          await user.fetchProfile();
          profile = user.profile;
        }

        const parsedProfile = ProfileSchema.safeParse({
          ...profile,
          pubkey,
          npub: nip19.npubEncode(pubkey),
        });
        if (parsedProfile.success) {
          return res.set('Cache-Control', 'public, max-age=3360').json({
            ...parsedProfile.data,
          });
        }
        return res.status(404).json({ message: 'User not found' });
      } catch (err) {
        return res.status(404).json({ message: 'User not found' });
      }
    });

  return app;
};
