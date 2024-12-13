'use client';
import { Button } from '@repo/design-system/components/ui/button';
import {
  MessageCircleIcon,
  ShareIcon,
  ThumbsUpIcon,
  ZapIcon,
} from 'lucide-react';

export function NoteActions() {
  return (
    <div className="flex items-center justify-between gap-2 text-foreground/70">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-9">
          <MessageCircleIcon className="size-5" />
          <span className="text-xs leading-none">7</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-9">
          <ThumbsUpIcon className="size-5" />
          <span className="text-xs leading-none">5</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-9">
          <ZapIcon className="size-5" />
          <span className="text-xs leading-none">3</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-9">
          <ShareIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
