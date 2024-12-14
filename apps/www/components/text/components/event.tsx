import { Button } from '@repo/design-system/components/ui/button';
import { cn } from '@repo/design-system/lib/utils';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';

export function Event({ eventId }: { eventId: number }) {
  return (
    <Link
      href={`/event/${eventId}`}
      className="flex items-stretch gap-x-3 rounded-lg bg-background p-3"
    >
      <div className="center shrink-0 text-primary">
        <CalendarIcon className="size-7" />
      </div>
      <div className="flex w-[1px] bg-muted-foreground" />
      <div className="flex flex-1 items-center gap-x-3">
        {/* <Button variant="outline" className={cn("text-foreground")}>
          Decline
        </Button> */}
        <Button variant="default" className={cn('flex-1')}>
          View Event
        </Button>
      </div>
    </Link>
  );
}
