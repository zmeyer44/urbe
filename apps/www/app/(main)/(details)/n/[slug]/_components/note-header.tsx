import { fetchUser } from '@/features/notes/functions/fetch-user';
import { Avatar } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import { relativeTime } from '@repo/design-system/lib/utils/functions';
import { MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';

type NoteHeaderProps = {
  pubkey: string;
  createdAt: number;
};
export async function NoteHeader({ pubkey, createdAt }: NoteHeaderProps) {
  const author = await fetchUser(pubkey);
  return (
    <div className="flex items-center justify-between">
      <Link href={`/${author.npub}`} className="flex items-center gap-2">
        <Avatar
          src={author.image}
          name={author.name}
          className="size-10 shrink-0 rounded-md"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-base">{author.name}</h3>
          {!!author.nip05 && (
            <span className="font-medium text-[.75rem] text-foreground/70 leading-none">
              {author.nip05}
            </span>
          )}
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <p className="font-medium text-[.75rem] text-foreground/70 leading-none">
          {relativeTime(new Date(createdAt * 1000))}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 text-foreground/70"
        >
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function NoteHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="size-10 shrink-0 rounded-md" />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-2 w-16" />
        <Button
          variant="ghost"
          size="icon"
          className="size-6 text-foreground/70"
        >
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
