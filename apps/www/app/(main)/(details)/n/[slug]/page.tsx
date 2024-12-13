import { Feed } from '@/containers/feed';
import { getNoteById } from '@/features/notes/functions/get-note-by-id';
import { notFound } from 'next/navigation';
import { NoteActions } from './_components/note-actions';
import { NoteHeader } from './_components/note-header';
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const slug = (await params).slug;
  const note = getNoteById(slug);
  if (!note) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3 px-2 pt-4">
        <NoteHeader
          author={note.author}
          content={note.content}
          timestamp={note.timestamp}
        />
        <div className="grow">
          <p className="text-base">{note.content}</p>
        </div>
        <NoteActions />
      </div>
      <div className="grow">
        <Feed gridProps={{ minWidth: 375 }} />
      </div>
    </div>
  );
}
