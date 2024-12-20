import { Feed } from '@/containers/feed';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Feed gridProps={{ minWidth: 375 }} />
      </Suspense>
    </div>
  );
}
