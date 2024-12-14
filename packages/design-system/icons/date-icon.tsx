import { formatDate } from '@repo/design-system/lib/utils';

type SmallCalendarIconProps = {
  date: Date;
};
export function DateIcon({ date }: SmallCalendarIconProps) {
  return (
    <div className="center min-w-10 shrink-0 overflow-hidden rounded-sm border bg-background text-muted-foreground">
      <div className="w-full text-center">
        <div className="bg-muted p-[2px] font-semibold text-[10px] uppercase">
          {formatDate(date, 'MMM')}
        </div>
        <div className="pb-[2px] text-center font-semibold text-[14px] text-foreground">
          {formatDate(date, 'D')}
        </div>
      </div>
    </div>
  );
}
