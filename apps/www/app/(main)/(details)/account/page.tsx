import { AccountSettingsCard } from '@/features/account/components/account-settings-card';

export default function AccountPage() {
  const profile = {
    name: 'John Doe',
    nostrAddress: 'nostr:npub1234567890abcdef',
    npub: 'npub1234567890abcdef',
    pubkey: 'pubkey1234567890abcdef',
    picture: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/150',
  };
  return <AccountSettingsCard {...profile} />;
}
