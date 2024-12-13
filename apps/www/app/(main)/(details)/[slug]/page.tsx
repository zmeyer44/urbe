import { Feed } from '@/containers/feed';
import { ProfileHeader } from './_components/profile-header';
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const slug = (await params).slug;
  const profile = {
    name: 'John Doe',
    nostrAddress: 'john@doe.com',
    picture: 'https://github.com/john.png',
    npub: 'npub1234567890abcdef',
  };
  return (
    <div className="flex flex-col gap-2">
      <ProfileHeader profile={profile} />
      <div className="grow">
        <Feed gridProps={{ minWidth: 375 }} />
      </div>
    </div>
  );
}
