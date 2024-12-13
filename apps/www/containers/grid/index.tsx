import { cn } from '@repo/design-system/lib/utils';
import type { ComponentProps } from 'react';

type GridProps = ComponentProps<'div'> & {
  minWidth?: number;
};

export function Grid({
  children,
  minWidth = 300,
  className,
  style,
  ...props
}: GridProps) {
  return (
    <div
      className={cn('grid gap-2', className)}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
