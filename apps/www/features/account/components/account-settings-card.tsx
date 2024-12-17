import { CopyNpubButton } from '@/features/account/components/copy-npub-button';
import { Avatar } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import { CheckCircleIcon } from 'lucide-react';
import Image from 'next/image';
type AccountSettingsCardProps = {
  banner?: string;
  name?: string;
  npub: string;
  pubkey: string;
  nostrAddress?: string;
  picture?: string;
};

export function AccountSettingsCard({
  banner,
  name,
  npub,
  nostrAddress,
  picture,
}: AccountSettingsCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-layer-1">
      {/* Banner Image */}
      <div className="relative h-[100px] w-full overflow-hidden bg-primary">
        {!!banner && (
          <Image
            src={banner}
            alt="Banner"
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>
      {/* Name */}
      <div className="flex flex-wrap justify-between gap-3 @md/main:px-4 px-2.5 @md/main:pt-2.5 pt-0 pb-3">
        <div className="flex">
          <div className="@lg/main:mt-[-20px] mt-[-20px] @md/main:mr-3 mr-2.5">
            <div className="relative aspect-square overflow-hidden ring-0">
              <Avatar
                src={picture}
                name={name}
                className="@lg/main:size-[65px] @md/main:size-[60px] size-[55px] @lg/main:rounded-[0.6rem] rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold @lg/main:text-xl @md/main:text-lg text-base text-foreground @md/main:leading-6 leading-5">
                {name}
              </h2>
              <CopyNpubButton npub={npub} />
            </div>
            {!!nostrAddress && (
              <div className="flex items-center gap-1">
                <p className="@md/main:text-xs text-[11px] text-foreground/70">
                  {nostrAddress}
                </p>
                <CheckCircleIcon className="h-3 w-3 text-primary" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button variant="outline">Edit Avatar</Button>
        </div>
      </div>
      <div className="p-2">
        <div className="rounded-lg bg-layer-2">
          <ul className="flex flex-col divide-y divide-layer-1">
            {[
              { label: 'Name', name: 'name', value: name },
              {
                label: 'Nostr Address',
                name: 'nostrAddress',
                value: nostrAddress,
              },
              {
                label: 'Description',
                name: 'description',
                value:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
              },
            ].map((i) => (
              <li
                key={i.name}
                className="flex items-center justify-between p-3"
              >
                <div className="flex flex-col gap-y-0.5">
                  <label
                    htmlFor={i.name}
                    className="font-semibold text-foreground/70 text-xs uppercase"
                  >
                    {i.label}
                  </label>
                  <p className="font-medium text-foreground text-sm">
                    {i.value}
                  </p>
                </div>
                <Button variant="layer-1" size="sm">
                  Edit
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
