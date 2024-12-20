'use server';
import { ProfileSchema } from '@repo/schemas';
import { createZodFetcher } from 'zod-fetch';
const fetchWithZod = createZodFetcher();

export async function fetchUser(pubkey: string, relays?: string[]) {
  return await fetchWithZod(
    ProfileSchema,
    // `${env.NEXT_PUBLIC_HTTP_PROXY_URL}/${pubkey}${
    //   relays ? `?relays=${relays.join(',')}` : ''
    // }`,
    `http://localhost:8080/${pubkey}${
      relays ? `?relays=${relays.join(',')}` : ''
    }`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
