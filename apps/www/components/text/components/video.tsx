import { cn } from '@repo/design-system/lib/utils';

export function Video({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative max-h-[300px] overflow-hidden rounded-xl',
        className
      )}
    >
      {/* <VideoPlayer src={url} title={"event video"} /> */}
    </div>
  );
}
