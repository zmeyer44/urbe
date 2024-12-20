'use server';
import { env } from '@repo/env';
import { ProfileSchema } from '@repo/schemas';
import { createZodFetcher } from 'zod-fetch';
const fetchWithZod = createZodFetcher();

export async function fetchUser(pubkey: string, relays?: string[]) {
  try {
    return await fetchWithZod(
      ProfileSchema,

      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8080'
          : env.NEXT_PUBLIC_HTTP_PROXY_URL
      }/${pubkey}${relays ? `?relays=${relays.join(',')}` : ''}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching user', error);
    throw error;
  }
}
