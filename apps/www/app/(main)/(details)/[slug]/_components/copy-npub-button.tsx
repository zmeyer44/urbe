'use client';

import { toast } from '@repo/design-system/components/ui/use-toast';
import { copyToClipboard, truncateText } from '@repo/design-system/lib/utils';
import { CopyIcon } from 'lucide-react';

export function CopyNpubButton({ npub }: { npub: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        copyToClipboard(npub);
        toast({
          title: 'Copied npub',
        });
      }}
      className="group flex items-center gap-1 text-foreground/70 hover:underline"
    >
      <span className="line-clamp-1 @md/main:text-xs text-[11px]">
        {truncateText(npub, 5)}
      </span>
      <CopyIcon className="@md/main:size-3 size-2.5 group-hover:text-foreground" />
    </button>
  );
}
