import { NoteCard } from '@/components/cards/note-card';
import { Grid } from '@/containers/grid';
import { fetchFeed } from '@/features/notes/functions/fetch-feed';
import { fetchNotes } from '@/features/notes/functions/fetch-notes';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import { cn } from '@repo/design-system/lib/utils';
import type { FilterSchema } from '@repo/schemas';
import { nip19 } from 'nostr-tools';
import type { ComponentProps } from 'react';
import type { z } from 'zod';
type FeedProps = {
  gridProps?: ComponentProps<typeof Grid>;
  noteCardProps?: ComponentProps<'div'>;
  filter?: z.infer<typeof FilterSchema>;
  pubkey?: string;
  options?: {
    sortBy?: 'created_at' | 'relevance';
    sortDirection?: 'asc' | 'desc';
  };
};
export async function Feed({
  gridProps = { minWidth: 375 },
  noteCardProps,
  filter,
  pubkey,
  options,
}: FeedProps) {
  console.log('FILTER IN FEED', filter);
  const notes = pubkey
    ? await fetchFeed(pubkey)
    : await fetchNotes({
        ...filter,
      });
  console.log('NOTES IN FEED', notes);
  return (
    <Grid {...gridProps}>
      {notes
        .sort((a, b) => {
          if (options?.sortBy === 'created_at') {
            return options.sortDirection === 'desc'
              ? b.created_at - a.created_at
              : a.created_at - b.created_at;
          }
          return 0;
        })
        .map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            {...noteCardProps}
            className={cn('flex', noteCardProps?.className)}
            link={`/n/${nip19.noteEncode(note.id)}`}
          />
        ))}
    </Grid>
  );
}

export async function FeedSkeleton({
  gridProps = { minWidth: 375 },
  noteCardProps,
}: ComponentProps<typeof Feed> & {
  length?: number;
}) {
  return (
    <Grid {...gridProps}>
      {Array.from({ length: length || 10 }).map((_, index) => (
        <Skeleton
          key={index}
          {...noteCardProps}
          className={cn(
            'flex min-h-[100px] rounded-lg bg-layer-1',
            noteCardProps?.className
          )}
        />
      ))}
    </Grid>
  );
}
