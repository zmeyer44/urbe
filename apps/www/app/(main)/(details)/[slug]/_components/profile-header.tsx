import { Avatar } from '@repo/design-system/components/ui/avatar';
import {} from '@repo/design-system/lib/utils';
import type { Profile } from '@repo/schemas';
import { CheckCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { CopyNpubButton } from './copy-npub-button';
import { FollowButton } from './follow-button';
import HeaderButtons from './header-buttons';

type ProfileHeaderProps = {
  profile: Profile;
};
export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-layer-1">
      <BannerImage image={profile.banner} />
      <div className="flex flex-wrap justify-between gap-3 @md/main:px-4 px-2.5 @md/main:pt-2.5 pt-2 pb-3">
        <div className="flex">
          <div className="@lg/main:mt-[-20px] mt-[-20px] @md/main:mr-3 mr-2.5">
            <div className="relative aspect-square overflow-hidden ring-0">
              <Avatar
                src={profile.image}
                name={profile.name}
                className="@lg/main:size-[65px] @md/main:size-[60px] size-[55px] @lg/main:rounded-[0.6rem] rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold @lg/main:text-xl @md/main:text-lg text-base text-foreground @md/main:leading-6 leading-5">
                {profile.name}
              </h2>
              <CopyNpubButton npub={profile.npub} />
            </div>
            {profile.nip05 && (
              <div className="flex items-center gap-1">
                <p className="@md/main:text-xs text-[11px] text-foreground/70">
                  {profile.nip05}
                </p>
                <CheckCircleIcon className="h-3 w-3 text-primary" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <HeaderButtons>
            <FollowButton className="@md/main:flex hidden" />
          </HeaderButtons>
        </div>
        <FollowButton className="@md/main:hidden w-full" />
      </div>
    </div>
  );
}

export function BannerImage({ image }: { image?: string | null }) {
  return (
    <div className="relative min-h-[75px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-primary pb-[calc(clamp(75px,21%,200px))]">
      {!!image && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-frosted">
          <Image
            src={image}
            alt={'banner image'}
            fill
            unoptimized
            objectFit="cover"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
