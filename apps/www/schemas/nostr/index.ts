import { z } from 'zod';

export const FilterSchema = z
  .object({
    id: z.string(),
    content: z.string(),
    author: z.string(),
    timestamp: z.string(),
  })
  .catchall(
    z
      .string()
      .array()
      .superRefine((val, ctx) => {
        const key = ctx.path[ctx.path.length - 1];
        if (!(typeof key === 'string' && /^#[a-zA-Z]$/.test(key))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Dynamic keys must be # followed by a single letter',
          });
        }
      })
  );
