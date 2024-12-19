import 'websocket-polyfill';
import { createServer } from './server';

async function main() {
  const PORT = process.env.PORT || 8080;
  const server = createServer();

  server.listen(PORT, () => {
    console.log(`api running on ${PORT}`);
  });
}

main();
