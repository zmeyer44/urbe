import NDK, { NDKRelay } from '@nostr-dev-kit/ndk';
import { env } from '@repo/env';
import { type Filter, ProxySchema } from '@repo/schemas/nostr';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import morgan from 'morgan';
// @ts-ignore
import { getPublicKey, nip19 } from 'nostr-tools';

const defaultRelays = env.DEFAULT_RELAYS.split(',');
export const createServer = (ndk: NDK): Express => {
  const app = express();
  const activePubkey =
    '1739d937dc8c0c7370aa27585938c119e25c41f6c441a5d34c6d38503e3136ef';

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    })
    .get('/', async (req, res) => {
      const defaultRelays = env.DEFAULT_RELAYS.split(',');
      const ndk = new NDK({
        explicitRelayUrls: defaultRelays,
      });
      let parsed = ProxySchema.safeParse(req.body);
      if (!parsed.success) {
        // Check url search params
        const urlSearchParams = new URLSearchParams(
          req.query as Record<string, string>
        );
        if (urlSearchParams.size === 0) {
          return res
            .status(400)
            .json({ message: 'Invalid request', error: parsed.error.message });
        }
        const relays = urlSearchParams.getAll('relay');
        const filterStringArrayKeys = ['ids', 'authors'];

        const filter: Filter = {};
        urlSearchParams.forEach((value, key) => {
          if (filterStringArrayKeys.includes(key) || key.match(/^#d$/)) {
            if (filter[key]) {
              filter[key].push(value);
            } else {
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
          }
        });

        console.log(filter);

        parsed = ProxySchema.safeParse({
          relays,
          filter,
        });
        console.log(parsed);
        if (!parsed.success) {
          return res
            .status(400)
            .json({ message: 'Invalid request', error: parsed.error.message });
        }
      }
      if (Object.keys(parsed.data?.filter || {}).length === 0) {
        return res
          .status(400)
          .json({ message: 'Invalid request', error: 'No filter provided' });
      }

      if (parsed.data.relays) {
        for (const relayUrl of parsed.data.relays) {
          ndk.pool.addRelay(new NDKRelay(relayUrl));
        }
        await ndk.connect();
      }

      const events = await ndk.fetchEvents({
        ...parsed.data.filter,
      });
      const eventsArray = Array.from(events).map((event) => event.rawEvent());
      return res.json(eventsArray);
    })
    .post('/', async (req, res) => {
      const defaultRelays = env.DEFAULT_RELAYS.split(',');
      const ndk = new NDK({
        explicitRelayUrls: defaultRelays,
      });
      const parsed = ProxySchema.safeParse(req.body);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ message: 'Invalid request', error: parsed.error.message });
      }
      if (parsed.data.relays) {
        for (const relayUrl of parsed.data.relays) {
          ndk.pool.addRelay(new NDKRelay(relayUrl));
        }
        await ndk.connect();
      }
      const jeff = ndk.getUser({
        pubkey: activePubkey,
      });
      await jeff.fetchProfile();
      const events = await ndk.fetchEvents({
        ...parsed.data.filter,
      });
      const eventsArray = Array.from(events).map((event) => event.rawEvent());
      return res.json(eventsArray);
    })
    .get('/:slug', async (req, res) => {
      const ndk = new NDK({
        explicitRelayUrls: defaultRelays,
      });
      await ndk.connect();
      if (req.params.slug.startsWith('npub')) {
        const decode = nip19.decode(req.params.slug);
        if (decode.type === 'npub') {
          const pubkey = decode.data;
          const user = ndk.getUser({
            pubkey,
          });
          await user.fetchProfile();
          return res.json(user.profile);
        }
        if (decode.type === 'nprofile') {
          const profile = decode.data;
          if (profile.relays) {
            for (const relayUrl of profile.relays) {
              ndk.pool.addRelay(new NDKRelay(relayUrl));
            }
            await ndk.connect();
          }
          const user = ndk.getUser({
            pubkey: profile.pubkey,
          });
          await user.fetchProfile();
          return res.json(user.profile);
        }
        if (decode.type === 'note') {
          const noteId = decode.data;
          const event = await ndk.fetchEvent(noteId);
          return res.json(event?.rawEvent());
        }
        if (decode.type === 'naddr') {
          const naddr = decode.data;
          const event = await ndk.fetchEvent({
            kinds: [naddr.kind],
            authors: [naddr.pubkey],
            '#d': [naddr.identifier],
          });
          return res.json(event?.rawEvent());
        }
        if (decode.type === 'nevent') {
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
        }
        if (decode.type === 'nsec') {
          const nsec = decode.data;
          const pubkey = await getPublicKey(nsec);
          const user = ndk.getUser({
            pubkey,
          });
          await user.fetchProfile();
          return res.json(user.profile);
        }
      } else {
        const pubkey = req.params.slug;
        const user = ndk.getUser({
          pubkey,
        });
        await user.fetchProfile();
        return res.json(user.profile);
      }
    });

  return app;
};