'use client';
import { cn } from '@repo/design-system/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export function BannerImage({ src }: { src: string }) {
  const [portrait, setPortrait] = useState(false);
  return (
    <>
      <Image
        className="absolute inset-0 h-full w-full scale-125 object-cover align-middle blur-lg"
        src={src}
        width={400}
        height={100}
        alt="banner"
        unoptimized
      />
      <div className="absolute inset-0 bg-background/50" />
      <Image
        priority
        className={cn(
          'absolute h-full object-cover align-middle',
          portrait
            ? '-translate-x-1/2 inset-y-0 left-1/2 mx-auto w-auto'
            : 'inset-0 w-full'
        )}
        src={src}
        width={400}
        height={100}
        alt="banner"
        unoptimized
      />
      <Image
        alt="demo"
        className="absolute right-full bottom-full h-auto w-auto"
        width={1}
        height={1}
        src={src}
        unoptimized
        onLoad={(e) => {
          if (e.currentTarget.width < e.currentTarget.height) {
            setPortrait(true);
          }
        }}
      />
    </>
  );
}
