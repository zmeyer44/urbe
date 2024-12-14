'use client';
import { Avatar } from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

type HostsSectionProps = {
  hosts: { id: string; name: string; image?: string | null }[];
};
export function HostsSection({ hosts }: HostsSectionProps) {
  return (
    <ul className="w-full">
      {hosts.map((host) => (
        <li key={host.id} className="w-full">
          <HostLine host={host} />
        </li>
      ))}
    </ul>
  );
}
function HostLine({
  host,
}: {
  host: { id: string; name: string; image?: string | null };
}) {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Avatar src={host.image} name={host.name} className="size-7" />
      <div className="flex-1 shrink overflow-hidden">
        <p className="truncate font-semibold text-foreground">{host.name}</p>
      </div>
      <div className="flex shrink-0 items-center">
        <Link href={`/user/${host.id}`}>
          <Button size="icon" variant={'ghost'} className="text-primary">
            <ChevronRightIcon className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
