'use server';
import { env } from '@repo/env';
import { EventSchema, type Filter } from '@repo/schemas';
import { z } from 'zod';
import { createZodFetcher } from 'zod-fetch';

const fetchWithZod = createZodFetcher();

// export async function fetchNotes(filter: Filter, relays?: string[]) {
//   const queryString = Object.entries(filter)
//     .map(([key, value]) => {
//       if (typeof value === 'string') {
//         return `${key}=${encodeURIComponent(value)}`;
//       }
//       if (Array.isArray(value)) {
//         return `${key}=${value.join(',')}`;
//       }
//       return `${key}=${value}`;
//     })
//     .join('&');
//   console.log(
//     'FILTER IN FETCH NOTES',
//     `${
//       process.env.NODE_ENV === 'development'
//         ? 'http://localhost:8080'
//         : env.NEXT_PUBLIC_HTTP_PROXY_URL
//     }?${queryString}${relays ? `&relays=${relays.join(',')}` : ''}`
//   );

//   return await fetchWithZod(
//     z.array(EventSchema),
//     `${
//       process.env.NODE_ENV === 'development'
//         ? 'http://localhost:8080'
//         : env.NEXT_PUBLIC_HTTP_PROXY_URL
//     }?${queryString}${relays ? `&relays=${relays.join(',')}` : ''}`,
//     {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     }
//   );
// }
export async function fetchNotes(filter: Filter, relays?: string[]) {
  try {
    return await fetchWithZod(
      z.array(EventSchema),
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8080'
          : env.NEXT_PUBLIC_HTTP_PROXY_URL
      }`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filter, relays }),
      }
    );
  } catch (error) {
    console.error('Error fetching notes', error);
    return [];
  }
}
