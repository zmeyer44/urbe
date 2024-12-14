import { Separator } from '@repo/design-system/components/ui/separator';
import type React from 'react';

type InfoSectionProps = {
  title: string;
  children: React.ReactNode;
};
export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <div className="">
      <h3 className="mb-1 font-semibold text-muted-foreground text-sm">
        {title}
      </h3>
      <Separator />
      <div className="mt-2">{children}</div>
    </div>
  );
}
