import { NoteCard } from '@/components/cards/note-card';
import { demoNotes } from '@/constants';
import { Grid } from '@/containers/grid';
import type { FilterSchema } from '@repo/schemas';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import type { z } from 'zod';
type FeedProps = {
  gridProps: ComponentProps<typeof Grid>;
  filter?: z.infer<typeof FilterSchema>;
};
export function Feed({ gridProps = { minWidth: 375 }, filter }: FeedProps) {
  return (
    <Grid {...gridProps}>
      {demoNotes.map((note, index) => (
        <Link href={`/n/${note.id}`} key={index} className="flex">
          <NoteCard note={note} className="flex-1" />
        </Link>
      ))}
    </Grid>
  );
}
