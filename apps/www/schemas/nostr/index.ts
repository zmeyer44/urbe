import { z } from 'zod';

export const filterSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.string(),
  timestamp: z.string(),
});
