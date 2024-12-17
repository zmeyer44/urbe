'use client';
import { CardContainer } from '@/containers/card/card-container';
import { CopyButton } from '@repo/design-system/components/buttons/copy-button';
import { useModal } from '@repo/design-system/components/modal';
import { ConfirmModal } from '@repo/design-system/components/modal/modals/confirm-modal';
import { Button } from '@repo/design-system/components/ui/button';
import { AccountSettingsCard } from '../components/account-settings-card';

export function AccountSettingsPage() {
  const { show, hide } = useModal();
  const profile = {
    name: 'John Doe',
    nostrAddress: 'nostr:npub1234567890abcdef',
    npub: 'npub1234567890abcdef',
    pubkey: 'pubkey1234567890abcdef',
    picture: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/150',
    delegateKeys: [
      {
        type: 'social',
        pubkey:
          'a09a00df04025f33e9611faf04c38ce229431b92cb85c96206390aed263d3761',
      },
      {
        type: 'wallet',
        pubkey:
          '5344eeee4bacc6c51ca385a5258795f773fd2394dca5ac4367837524f88979e0',
      },
      {
        type: 'social',
        pubkey:
          '35575bc732e849fd7bd3aa6ee01f157caf834d4e99b23c237dc7382b466bb4f1',
      },
    ],
  };
  return (
    <div className="flex flex-col gap-y-4">
      <AccountSettingsCard {...profile} />
      <CardContainer title="Delegate Keys">
        <ul className="flex flex-col divide-y divide-layer-1">
          {profile.delegateKeys.map((i) => (
            <li
              key={i.pubkey}
              className="flex items-center justify-between gap-x-3 p-3"
            >
              <div className="flex flex-col gap-y-0.5">
                <label
                  htmlFor={i.pubkey}
                  className="font-semibold text-foreground/70 text-xs uppercase"
                >
                  {i.type}
                </label>
                <p className="truncate font-medium text-foreground text-sm">
                  {i.pubkey}
                </p>
              </div>
              <Button
                variant="layer-1"
                size="sm"
                onClick={() =>
                  show(
                    <ConfirmModal
                      title="Edit Delegate Key"
                      onConfirm={() => {}}
                    />
                  )
                }
              >
                Edit
              </Button>
              <CopyButton variant="layer-1" size="sm" value={i.pubkey} />
            </li>
          ))}
        </ul>
      </CardContainer>
    </div>
  );
}
