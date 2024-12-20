import { Feed } from '@/containers/feed';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Feed
          gridProps={{ minWidth: 375 }}
          filter={{ kinds: [1], limit: 10 }}
        />
      </Suspense>
    </div>
  );
}
