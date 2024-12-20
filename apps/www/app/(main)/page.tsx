import { Feed, FeedSkeleton } from '@/containers/feed';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<FeedSkeleton gridProps={{ minWidth: 375 }} />}>
        <Feed
          gridProps={{ minWidth: 375 }}
          filter={{ kinds: [1], limit: 10 }}
          pubkey="17717ad4d20e2a425cda0a2195624a0a4a73c4f6975f16b1593fc87fa46f2d58"
        />
      </Suspense>
    </div>
  );
}
