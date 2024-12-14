import { cn, formatDate } from '@repo/design-system/lib/utils';
import type { ComponentProps } from 'react';

type SmallCalendarIconProps = ComponentProps<'div'> & {
  date: Date;
};
export function DateIcon({
  date,
  className,
  ...props
}: SmallCalendarIconProps) {
  return (
    <div
      className={cn(
        'center aspect-square min-w-10 shrink-0 overflow-hidden rounded-md border bg-background text-muted-foreground',
        className
      )}
      {...props}
    >
      <div className="flex w-full flex-col text-center">
        <div className="center bg-layer-1 p-[2px]">
          <span className="font-semibold text-[11px] text-muted-foreground leading-none">
            {formatDate(date, 'MMM')}
          </span>
        </div>
        <div className="grow pb-[2px] text-center font-semibold text-[14px] text-foreground">
          {formatDate(date, 'D')}
        </div>
      </div>
    </div>
  );
}
