import * as React from 'react';
import { cn } from '@repo/design-system/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}

const InputSuffix = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffix, ...props }, ref) => {
    return (
      <div className="relative flex w-full">
        <input
          type={type}
          className={cn(
            "placeholder:text-muted-foreground focus:ring-primary z-10 flex h-9 w-full rounded-l-md border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            suffix && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="border-border bg-muted/30 text-muted-foreground flex items-center whitespace-nowrap rounded-r-md border border-l-0 px-3 text-sm">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);
InputSuffix.displayName = "InputSuffix";

export { InputSuffix };
