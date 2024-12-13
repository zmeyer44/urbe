import { Avatar } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import { relativeTime } from '@repo/design-system/lib/utils/functions';
import { MessageCircleIcon, MoreHorizontalIcon, ZapIcon } from 'lucide-react';

type NoteCardProps = {
  author: {
    name: string;
    picture?: string;
    nostrAddress?: string;
  };
  content: string;
  timestamp: number;
};

export function NoteCard({ author, content, timestamp }: NoteCardProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg bg-layer-1 p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            src={author.picture}
            name={author.name}
            className="size-6.5 shrink-0 rounded-md"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-[.8rem] leading-5">
              {author.name}
            </h3>
            {!!author.nostrAddress && (
              <span className="font-medium text-[.65rem] text-foreground/70 leading-none">
                {author.nostrAddress}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-[.6rem] text-foreground/70 leading-none">
            {relativeTime(new Date(timestamp))}
          </p>
          <Button
            variant="layer-1"
            size="icon"
            className="size-6 text-foreground/70"
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grow">
        <p className="text-[.8rem] leading-5">{content}</p>
      </div>
      <div className="flex items-center gap-1 text-foreground/70">
        <Button variant="layer-1" size="sm" className="h-4 w-auto px-2 py-0.5">
          <MessageCircleIcon className="!size-3.5" />
          <span className="text-[.6rem] leading-none">1</span>
        </Button>
        <Button variant="layer-1" size="sm" className="h-4 w-auto px-2 py-0.5">
          <ZapIcon className="!size-3.5" />
          <span className="text-[.6rem] leading-none">1</span>
        </Button>
      </div>
    </div>
  );
}
