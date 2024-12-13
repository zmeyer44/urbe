import { NoteCard } from '@/components/cards/note-card';
import { demoNotes } from '@/constants';
import { Grid } from '@/containers/grid';
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
export function Feed({
  gridProps = { minWidth: 375 },
  noteCardProps,
  filter,
}: FeedProps) {
  return (
    <Grid {...gridProps}>
      {demoNotes.map((note, index) => (
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
