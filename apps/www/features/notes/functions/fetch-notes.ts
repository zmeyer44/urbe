'use server';
import { EventSchema, type Filter } from '@repo/schemas';
import { z } from 'zod';
import { createZodFetcher } from 'zod-fetch';

const fetchWithZod = createZodFetcher();

export async function fetchNotes(filter: Filter, relays?: string[]) {
  const queryString = Object.entries(filter)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}=${encodeURIComponent(value)}`;
      }
      if (Array.isArray(value)) {
        return `${key}=${value.join(',')}`;
      }
      return `${key}=${value}`;
    })
    .join('&');
  return await fetchWithZod(
    z.array(EventSchema),
    // `${env.NEXT_PUBLIC_HTTP_PROXY_URL}`,
    `http://localhost:8080?${queryString}${relays ? `&relays=${relays.join(',')}` : ''}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
