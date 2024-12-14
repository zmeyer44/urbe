import { cn } from '@repo/design-system/lib/utils';
import type { ComponentProps } from 'react';

type TemplateProps = ComponentProps<'div'> & {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};
export function Template({
  title,
  children,
  footer,
  className,
  ...props
}: TemplateProps) {
  return (
    <div
      className={cn(
        'isolate w-full rounded-md bg-background md:max-w-md md:border md:border-stone-200 md:shadow',
        className
      )}
      {...props}
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        {!!title && (
          <h2 className="font-accent font-semibold text-2xl">{title}</h2>
        )}
        {children}
      </div>
      {!!footer && (
        <div className="flex items-center justify-end rounded-b-lg border-stone-200 border-t bg-stone-50 p-3 md:px-10">
          {footer}
        </div>
      )}
    </div>
  );
}
