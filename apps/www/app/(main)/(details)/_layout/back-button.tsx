'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { cn } from '@repo/design-system/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const hasPreviousPage = window.history.length > 1;
    const referrer = document.referrer;
    const isSameOrigin =
      !!referrer && new URL(referrer).origin === window.location.origin;
    setCanGoBack(hasPreviousPage && isSameOrigin);
  }, []);

  if (!canGoBack) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-lg bg-layer-1',
        className
      )}
    >
      <Button
        variant="layer-1"
        size="sm"
        className="gap-2"
        onClick={() => {
          if (canGoBack) {
            router.back();
          } else {
            router.push('/');
          }
        }}
      >
        <ArrowLeftIcon className="size-4" />
        <span className="font-medium text-xs">back</span>
      </Button>
    </div>
  );
}
