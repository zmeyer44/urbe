import { z } from 'zod';

// export const ProxySchema = z.object({
//   relay: z.string().url(),
//   filter: FilterSchema,
// });
export const ProxySchema = z.object({
  relay: z.string().url().array().optional(),
  filter: z
    .object({
      ids: z.array(z.string().length(64).toLowerCase()).optional(),
      authors: z.array(z.string().length(64).toLowerCase()).optional(),
      kinds: z.array(z.number().int().min(0).max(65535)).optional(),
      since: z.number().int().min(0).optional(),
      until: z.number().int().min(0).optional(),
      limit: z.number().int().min(1).optional(),
    })
    .and(
      z.object({
        relay: z.string().url().array().optional(),
      })
    ),
});

const schema = z
  .object({
    limit: z.number(),
    authors: z.string().array(),
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

// Example usage:
const valid = {
  limit: 10,
  '#d': 10,
  '#a': 5,
};

const invalid = {
  limit: 10,
  '#dd': 10, // invalid - more than one letter
  d: 5, // invalid - missing #
};

type Schema = z.infer<typeof schema>;
