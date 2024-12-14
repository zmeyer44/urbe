import { cn } from '@repo/design-system/lib/utils';
import { MapPinIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

export function PinIcon({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'center aspect-square h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-background text-muted-foreground',
        className
      )}
      {...props}
    >
      <div className="center w-full text-center">
        <div className="text-center font-medium text-[14px]">
          <MapPinIcon className="size-5" />
        </div>
      </div>
    </div>
  );
}
