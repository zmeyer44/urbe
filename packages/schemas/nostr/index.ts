import { z } from 'zod';

export const FilterSchema = z
  .object({
    ids: z.array(z.string().length(64).toLowerCase()).optional(),
    authors: z.array(z.string().length(64).toLowerCase()).optional(),
    kinds: z.array(z.number().int().min(0).max(65535)).optional(),
    since: z.number().int().min(0).optional(),
    until: z.number().int().min(0).optional(),
    limit: z.number().int().min(1).optional(),
  })
  .and(
    z.record(z.string().regex(/^#?[a-zA-Z]$/), z.array(z.string())).optional()
  );
