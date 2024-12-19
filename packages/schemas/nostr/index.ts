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

export type Filter = z.infer<typeof FilterSchema>;

export const ProxySchema = z.object({
  relays: z.array(z.string()).optional(),
  filter: FilterSchema,
});

export type Proxy = z.infer<typeof ProxySchema>;
