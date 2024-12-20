'use server';
import { env } from '@repo/env';
import { EventSchema } from '@repo/schemas';
import { createZodFetcher } from 'zod-fetch';

const fetchWithZod = createZodFetcher();

export async function fetchNote(identifier: string, relays?: string[]) {
  console.log(
    'fetching note',
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : env.NEXT_PUBLIC_HTTP_PROXY_URL
    }/${identifier}${relays ? `?relays=${relays.join(',')}` : ''}`
  );
  try {
    return await fetchWithZod(
      EventSchema,
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8080'
          : env.NEXT_PUBLIC_HTTP_PROXY_URL
      }/${identifier}${relays ? `?relays=${relays.join(',')}` : ''}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching note', error);
    return null;
  }
}
