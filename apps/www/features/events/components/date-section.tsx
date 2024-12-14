'use client';
// import type { GetEventReturnType } from "@/actions/events";
import { DateIcon } from '@repo/design-system/icons/date-icon';
import { formatDate } from '@repo/design-system/lib/utils';

type DateSectionProps = {
  event: {
    start: string;
    end?: string | null;
  };
};
export function DateSection({ event }: DateSectionProps) {
  const startDate = new Date(event.start);
  const endDate = event.end ? new Date(event.end) : null;
  return (
    <div className="flex items-center gap-3">
      <DateIcon date={startDate} className="border-layer-1" />
      <div className="">
        <p className="font-semibold @xl/main:text-base text-sm">
          {formatDate(startDate, 'dddd, MMMM Do')}
        </p>
        {endDate ? (
          <p className="@xl/main:text-sm text-muted-foreground text-xs">{`${formatDate(
            startDate,
            'h:mm a'
          )} to ${formatDate(endDate, 'h:mm a')}`}</p>
        ) : (
          <p className="@xl/main:text-sm text-muted-foreground text-xs">{`${formatDate(
            startDate,
            'h:mm a'
          )}`}</p>
        )}
      </div>
    </div>
  );
}
