'use client';
import { Avatar } from '@repo/design-system/components/ui/avatar';
import { Badge } from '@repo/design-system/components/ui/badge';
import { InfoSection } from './info-section';

type Attendee = {
  pubkey: string;
  status: string;

  image: string;
  name: string;
  email: string;
};
type AttendeesDetailsSectionProps = {
  eventId: number;
  action?: (attendee: Attendee) => React.ReactNode;
};
export function AttendeesDetailsSection({
  eventId,
  action,
}: AttendeesDetailsSectionProps) {
  // const { data, isLoading } = api.event.getAttendees.useQuery({ eventId });
  const isLoading = false;
  const data: Attendee[] = [];
  if (isLoading) {
    return (
      <InfoSection title={'Attendees'}>
        <AttendeesLoadingSkeleton />
      </InfoSection>
    );
  }
  if (!data || data.length === 0) {
    return (
      <InfoSection title={'Attendees'}>
        <div className="text-muted-foreground text-sm">No attendees</div>
      </InfoSection>
    );
  }
  return (
    <InfoSection title={'Attendees'}>
      <div className="w-full space-y-3">
        {data.map((attendee) => (
          <div key={attendee.pubkey} className="flex items-center gap-x-2">
            <div className="shrink-0">
              <Avatar
                src={attendee.image}
                name={attendee.name}
                className="size-8"
              />
            </div>
            <div className="center flex-1 justify-between overflow-hidden">
              <div className="flex items-center gap-x-3">
                <div className="flex flex-col">
                  <h4 className="font-medium text-sm leading-tight">
                    {attendee.name}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {attendee.email}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={'outline'} className="capitalize">
                    {attendee.status}
                  </Badge>
                </div>
              </div>
              {!!action && action(attendee)}
            </div>
          </div>
        ))}
      </div>
    </InfoSection>
  );
}
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
function AttendeesLoadingSkeleton() {
  return (
    <div className="w-full space-y-3">
      {new Array(3).fill(0).map((_, index) => (
        <div key={index} className="flex items-center gap-x-2">
          <div className="shrink-0">
            <Skeleton className="size-8 rounded-full bg-muted" />
          </div>
          <div className="center flex-1 justify-between overflow-hidden">
            <div className="flex items-center gap-x-3">
              <div className="flex flex-col">
                <Skeleton className="h-4 w-24 rounded bg-muted" />
                <Skeleton className="mt-1 h-3 w-32 rounded bg-muted" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-5 w-16 rounded bg-muted" />
              </div>
            </div>
            <Skeleton className="h-7 w-14 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
