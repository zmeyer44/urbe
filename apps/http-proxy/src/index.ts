import 'websocket-polyfill';
import NDK from '@nostr-dev-kit/ndk';
import { env } from '@repo/env';
import { createServer } from './server';

async function main() {
  const defaultRelays = env.DEFAULT_RELAYS.split(',');
  console.log({ defaultRelays });
  const ndk = new NDK({
    explicitRelayUrls: defaultRelays,
  });
  await ndk.connect();
  const pubkeys = [
    '1739d937dc8c0c7370aa27585938c119e25c41f6c441a5d34c6d38503e3136ef',
  ];
  // const jeff = ndk.getUser({
  //   pubkey: activePubkey,
  // });
  // jeff.fetchProfile();

  // const app: Application = express();
  const PORT = process.env.PORT || 8080;
  const server = createServer(ndk);

  server.listen(PORT, () => {
    console.log(`api running on ${PORT}`);
  });

  // app.post('/proxy', (req: Request, res: Response) => {
  //   console.log('Request received');
  //   const urlSearchParams = new URLSearchParams(
  //     req.query as Record<string, string>
  //   );
  //   const relay = urlSearchParams.get('relay');

  //   // Parse the request body
  //   let parsedBody: unknown;
  //   try {
  //     // Need to use body-parser middleware to parse JSON bodies
  //     if (!req.body) {
  //       throw new Error('No request body found');
  //     }
  //     parsedBody = req.body;
  //     console.log('Received body:', parsedBody);
  //   } catch (error) {
  //     return res.status(400).json({ error: 'Invalid JSON body' });
  //   }

  //   console.log({ relay, body: parsedBody });

  //   res.json(parsedBody);
  // });

  // app.get('/pablo', (req: Request, res: Response) => {
  //   pubkeys.push('Ttest');
  //   res.send(`Pubkeys ${pubkeys.length}`);
  // });
  // app.listen(PORT, () => {
  //   console.log(`Example app listening on port ${PORT}`);
  // });
}

main();
