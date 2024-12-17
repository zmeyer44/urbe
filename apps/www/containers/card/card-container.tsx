import { cn } from '@repo/design-system/lib/utils';
import type { ComponentProps } from 'react';

export function CardContainer({
  children,
  className,
  title,
}: ComponentProps<'div'> & { title: string }) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl bg-layer-1 p-2',
        className
      )}
    >
      <div className="mb-1 flex items-center">
        <h3 className="font-accent font-semibold text-base">{title}</h3>
      </div>
      <div className="flex-1 rounded-lg bg-layer-2">{children}</div>
    </div>
  );
}
