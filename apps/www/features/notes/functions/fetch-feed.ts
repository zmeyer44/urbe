'use server';
import { env } from '@repo/env';
import { EventSchema } from '@repo/schemas';
import { z } from 'zod';
import { createZodFetcher } from 'zod-fetch';

const fetchWithZod = createZodFetcher();

export async function fetchFeed(pubkey: string, relays?: string[]) {
  try {
    return await fetchWithZod(
      z.array(EventSchema),
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8080'
          : env.NEXT_PUBLIC_HTTP_PROXY_URL
      }/feed/${pubkey}${relays ? `?relays=${relays.join(',')}` : ''}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching feed', error);
    return [];
  }
}
