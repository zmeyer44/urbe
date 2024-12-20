import { TextRenderer } from '@/components/text/text-renderer';
import { Button } from '@repo/design-system/components/ui/button';
import { cn, relativeTime } from '@repo/design-system/lib/utils/functions';
import type { Event } from '@repo/schemas';
import { MessageCircleIcon, MoreHorizontalIcon, ZapIcon } from 'lucide-react';
import { Suspense } from 'react';
import type { ComponentProps } from 'react';
import { Profile, ProfileSkeleton } from './profile';

type NoteCardProps = ComponentProps<'div'> & {
  note: Event;
};

export function NoteCard({ note, className, ...noteProps }: NoteCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2.5 rounded-lg bg-layer-1 p-2.5',
        className
      )}
      {...noteProps}
    >
      <div className="flex items-center justify-between">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile pubkey={note.pubkey} />
        </Suspense>
        <div className="flex items-center gap-2">
          <p className="font-medium text-[.6rem] text-foreground/70 leading-none">
            {relativeTime(new Date(note.created_at * 1000))}
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
      <div className="grow overflow-hidden">
        <p className="text-[.8rem] leading-5">
          <TextRenderer text={note.content} />
        </p>
      </div>
      <div className="-my-2 flex items-center gap-1 text-foreground/70">
        <Button variant="ghost" size="sm" className="p-2">
          <MessageCircleIcon className="!size-3.5" />
          <span className="text-[.6rem] leading-none">1</span>
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <ZapIcon className="!size-3.5" />
          <span className="text-[.6rem] leading-none">1</span>
        </Button>
      </div>
    </div>
  );
}
