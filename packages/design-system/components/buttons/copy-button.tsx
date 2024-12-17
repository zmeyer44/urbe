'use client';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/components/ui/use-toast';
import { cn, copyToClipboard } from '@repo/design-system/lib/utils';
import { CopyIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
export function CopyButton({
  value,
  children,
  iconClassName,
  ...buttonProps
}: ComponentProps<typeof Button> & {
  value: string;
  iconClassName?: string;
}) {
  const { toast } = useToast();
  return (
    <Button
      {...buttonProps}
      onClick={() => {
        copyToClipboard(value);
        toast({ title: 'Copied to clipboard' });
      }}
    >
      {children ?? <CopyIcon className={cn('size-4', iconClassName)} />}
    </Button>
  );
}
