import { NoteCard } from '@/components/cards/note-card';
import { Grid } from '@/containers/grid';
import { fetchNotes } from '@/features/notes/functions/fetch-notes';
import { cn } from '@repo/design-system/lib/utils';
import type { FilterSchema } from '@repo/schemas';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import type { z } from 'zod';
type FeedProps = {
  gridProps: ComponentProps<typeof Grid>;
  noteCardProps?: ComponentProps<'div'>;
  filter?: z.infer<typeof FilterSchema>;
};
export async function Feed({
  gridProps = { minWidth: 375 },
  noteCardProps,
  filter,
}: FeedProps) {
  const notes = await fetchNotes({
    ...filter,
  });
  return (
    <Grid {...gridProps}>
      {notes.map((note, index) => (
        <Link href={`/n/${note.id}`} key={index} className="flex">
          <NoteCard
            note={note}
            {...noteCardProps}
            className={cn('flex-1', noteCardProps?.className)}
          />
        </Link>
      ))}
    </Grid>
  );
}
