'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { MessageCircleIcon, ZapIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type HeaderButtonsProps = {
  children?: ReactNode;
};
export default function HeaderButtons({ children }: HeaderButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Button size={'sm'} variant={'ghost'} className="gap-x-1.5 px-2">
          <ZapIcon className="h-4 w-4" />
        </Button>
        <Button size={'sm'} variant={'ghost'} className="gap-x-1.5 px-2">
          <MessageCircleIcon className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </div>
  );
}
