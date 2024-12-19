import 'websocket-polyfill';
import NDK from '@nostr-dev-kit/ndk';
import { createServer } from './server';

async function main() {
  const defaultRelays = [
    'wss://relay.nostr.band',
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://nostr.wine',
    'wss://nostr.mom',
    'wss://e.nos.lol',
  ];
  console.log({ defaultRelays });
  const ndk = new NDK({
    explicitRelayUrls: defaultRelays,
  });
  await ndk.connect();

  const PORT = process.env.PORT || 8080;
  const server = createServer(ndk);

  server.listen(PORT, () => {
    console.log(`api running on ${PORT}`);
  });
}

main();
