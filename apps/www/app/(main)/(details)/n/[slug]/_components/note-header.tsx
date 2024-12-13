import { Avatar } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import { relativeTime } from '@repo/design-system/lib/utils/functions';
import { MoreHorizontalIcon } from 'lucide-react';

type NoteHeaderProps = {
  author: {
    name: string;
    picture?: string;
    nostrAddress?: string;
  };
  content: string;
  timestamp: number;
};
export function NoteHeader({ author, content, timestamp }: NoteHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar
          src={author.picture}
          name={author.name}
          className="size-10 shrink-0 rounded-md"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-base">{author.name}</h3>
          {!!author.nostrAddress && (
            <span className="font-medium text-[.75rem] text-foreground/70 leading-none">
              {author.nostrAddress}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-medium text-[.75rem] text-foreground/70 leading-none">
          {relativeTime(new Date(timestamp))}
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
