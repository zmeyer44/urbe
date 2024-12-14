import { cn } from '@repo/design-system/lib/utils';
import NextImage from 'next/image';

export function Image({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      <NextImage
        alt="Image"
        height="288"
        width="288"
        unoptimized
        src={url}
        className={cn('h-full rounded-xl bg-muted object-cover object-center')}
      />
    </div>
  );
}
