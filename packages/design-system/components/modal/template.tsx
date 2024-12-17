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
        'isolate w-full rounded-md bg-background md:max-w-md md:border md:border-layer-1 md:shadow',
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
      {!!footer && <FormFooter>{footer}</FormFooter>}
    </div>
  );
}

export function FormFooter({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end rounded-b-lg border-layer-1 border-t bg-layer-1/40 p-3 md:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
