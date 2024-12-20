import { TextRenderer } from '@/components/text/text-renderer';
import { Feed, FeedSkeleton } from '@/containers/feed';
import { fetchNote } from '@/features/notes/functions/fetch-note';
import { getTagValues } from '@repo/utils';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { NoteActions } from './_components/note-actions';
import { NoteHeader, NoteHeaderSkeleton } from './_components/note-header';
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const slug = (await params).slug;

  const note = await fetchNote(slug);

  if (!note) {
    return notFound();
  }
  const mentionedNotes = getTagValues(note.tags, 'e', {
    index: 1,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3 px-2 pt-4">
        {mentionedNotes.length ? (
          <Suspense
            fallback={<FeedSkeleton gridProps={{ minWidth: 375 }} length={1} />}
          >
            <Feed
              gridProps={{ minWidth: 375 }}
              options={{
                sortBy: 'created_at',
                sortDirection: 'asc',
              }}
              filter={{
                kinds: [1],
                ids: mentionedNotes,
                limit: 10,
              }}
              noteCardProps={{ className: 'bg-opacity-40' }}
            />
          </Suspense>
        ) : null}
        <Suspense fallback={<NoteHeaderSkeleton />}>
          <NoteHeader pubkey={note.pubkey} createdAt={note.created_at} />
        </Suspense>
        <div className="grow">
          <div className="text-base">
            <TextRenderer text={note.content} />
          </div>
        </div>
        <NoteActions />
      </div>
      <div className="grow">
        <Suspense fallback={<FeedSkeleton gridProps={{ minWidth: 375 }} />}>
          <Feed
            gridProps={{ minWidth: 375 }}
            filter={{
              kinds: [1],
              '#e': [note.id],
              limit: 10,
            }}
            options={{
              sortBy: 'created_at',
              sortDirection: 'asc',
            }}
            noteCardProps={{ className: 'bg-opacity-40' }}
          />
        </Suspense>
      </div>
    </div>
  );
}
