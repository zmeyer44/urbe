import { fetchUser } from '@/features/notes/functions/fetch-user';
import { Avatar } from '@repo/design-system/components/ui/avatar';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import { truncateText } from '@repo/design-system/lib/utils';

export async function Profile({ pubkey }: { pubkey: string }) {
  const user = await fetchUser(pubkey);
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Avatar
        src={user.image}
        name={user.name}
        className="size-6.5 shrink-0 rounded-md"
      />
      <div className="flex flex-col gap-y-0.5">
        <h3 className="truncate font-semibold text-[.8rem] leading-3">
          {user.name ?? truncateText(user.npub ?? pubkey, 10)}
        </h3>
        {!!user.nip05 && (
          <span className="truncate font-medium text-[.65rem] text-foreground/70 leading-none">
            {user.nip05}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Skeleton className="size-6.5 shrink-0 rounded-md" />
      <div className="flex flex-col">
        <h3 className="mb-1 font-semibold text-[.8rem] leading-5">
          <Skeleton className="h-3 w-16" />
        </h3>
        <Skeleton className="h-2 w-20" />
      </div>
    </div>
  );
}
