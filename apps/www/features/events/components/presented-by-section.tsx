'use client';

import { Avatar } from '@repo/design-system/components/ui/avatar';
// import type { Event, User } from "@prisma/client";
import { cn } from '@repo/design-system/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
// import type { GetEventReturnType } from "@/actions/events";

type PresentedBySectionProps = {
  event: {
    pubkey: string;
  };
  className?: string;
};

export function PresentedBySection({
  event,
  className,
}: PresentedBySectionProps) {
  const host = event.pubkey;
  return (
    <div className={cn('space-y-3', className)}>
      {/* Calendar */}
      <div className="flex items-center gap-3">
        <Avatar
          // src={host}
          name={host}
          className="size-10 rounded-md"
        />

        <div className="flex flex-col justify-center">
          <span className="text-muted-foreground text-xs">Presented by</span>
          <div className="flex items-center gap-x-1">
            <h4 className="font-medium text-sm leading-tight">{host}</h4>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      {/* Hosts Section */}
      {/* <InfoSection title={'Hosted By'}>
        <HostsSection hosts={[host]} />
      </InfoSection> */}
      {/* Attendees Section */}
      {/* <InfoSection title={"Attendees"}>
        <HostsSection hosts={[]} />
      </InfoSection> */}
    </div>
  );
}

export function CalendarLink({ event, className }: PresentedBySectionProps) {
  const host = event.pubkey;

  return (
    <div className="flex items-center gap-2">
      <Avatar name={host} className="size-5 rounded" />
      <div className="flex items-center gap-x-1">
        <h4 className="font-medium text-sm leading-tight">{host}</h4>
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}
