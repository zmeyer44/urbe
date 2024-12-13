import type { ReactNode } from 'react';
import { BackButton } from './_layout/back-button';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-sm">
      <BackButton className="mb-2" />
      {children}
    </div>
  );
}
