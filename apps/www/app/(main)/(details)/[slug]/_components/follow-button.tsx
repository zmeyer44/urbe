'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { cn } from '@repo/design-system/lib/utils';
import { UserPlusIcon } from 'lucide-react';

export function FollowButton({ className }: { className?: string }) {
  return (
    <Button
      onClick={(e) => {
        console.log('captured');
        // modal?.show(<ZapPicker event={event} />);
      }}
      size={'sm'}
      className={cn('gap-x-1.5', className)}
    >
      <UserPlusIcon className="h-4 w-4" />
      <span>Follow</span>
    </Button>
  );
}
