import { TextRenderer } from '@/components/text/text-renderer';
import { Button } from '@repo/design-system/components/ui/button';
import { cn, relativeTime } from '@repo/design-system/lib/utils/functions';
import type { Event } from '@repo/schemas';
import { MessageCircleIcon, MoreHorizontalIcon, ZapIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import type { ComponentProps } from 'react';
import { Profile, ProfileSkeleton } from './profile';

type NoteCardProps = ComponentProps<'div'> & {
  note: Event;
  link?: string;
};

export function NoteCard({
  note,
  className,
  link,
  ...noteProps
}: NoteCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-2.5 overflow-hidden rounded-lg bg-layer-1 p-2.5',
        className
      )}
      {...noteProps}
    >
      {!!link && <Link href={link} className="absolute inset-0 z-0 block" />}
      <div className="flex items-center justify-between">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile pubkey={note.pubkey} />
        </Suspense>
        <div className="flex items-center gap-2">
          <div className="font-medium text-[.6rem] text-foreground/70 leading-none">
            {relativeTime(new Date(note.created_at * 1000))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="z-10 size-6 text-foreground/70"
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grow overflow-hidden">
        <div className="text-[.8rem] leading-5">
          {/* {!!link && (
            <Link href={link} className="-z-10 absolute inset-0 bg-red-500" />
          )} */}
          <TextRenderer text={note.content} />
        </div>
      </div>

      <div className="-my-2 flex items-center gap-1 text-foreground/70">
        <Button variant="ghost" size="sm" className="z-10 p-2">
          <MessageCircleIcon className="!size-3.5" />
          <span className="text-[.6rem] leading-none">1</span>
        </Button>
        <Button variant="ghost" size="sm" className="z-10 p-2">
          <ZapIcon className="!size-3.5" />
          <span className="text-[.6rem] leading-none">1</span>
        </Button>
      </div>
    </div>
  );
}
