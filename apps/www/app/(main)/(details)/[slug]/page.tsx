import { Feed } from '@/containers/feed';
import { fetchUser } from '@/features/notes/functions/fetch-user';
import { ProfileHeader } from './_components/profile-header';
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const slug = (await params).slug;
  const profile = await fetchUser(slug);
  if (!profile) {
    return <div>User not found</div>;
  }
  return (
    <div className="flex flex-col gap-2">
      <ProfileHeader profile={profile} />
      <div className="grow">
        <Feed
          gridProps={{ minWidth: 375 }}
          filter={{
            kinds: [1],
            authors: [profile.pubkey],
            limit: 10,
          }}
        />
      </div>
    </div>
  );
}
