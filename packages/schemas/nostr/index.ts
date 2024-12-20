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

export const EventSchema = z.object({
  id: z.string().length(64).toLowerCase(),
  pubkey: z.string().length(64).toLowerCase(),
  created_at: z.number().int().min(0),
  kind: z.number().int().min(0).max(65535),
  tags: z.array(z.array(z.string())),
  content: z.string(),
  sig: z.string().length(128),
});

export type Event = z.infer<typeof EventSchema>;

export const RelaysSchema = z.object({
  relays: z.array(z.string()),
});

export type Relays = z.infer<typeof RelaysSchema>;

export const ProfileSchema = z.object({
  created_at: z.number().int().min(0).nullish(),
  profileEvent: z
    .union([EventSchema, z.string().transform((str) => JSON.parse(str))])
    .pipe(EventSchema)
    .nullish(),
  image: z.string().nullish(),
  name: z.string().nullish(),
  about: z.string().nullish(),
  banner: z.string().nullish(),
  website: z.string().nullish(),
  nip05: z.string().nullish(),
  lud16: z.string().nullish(),
  pubkey: z.string().length(64).toLowerCase().nullish(),
  npub: z.string().toLowerCase().startsWith('npub').nullish(),
});

export type Profile = z.infer<typeof ProfileSchema>;
