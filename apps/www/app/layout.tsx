import '@repo/design-system/styles/globals.css';
import '@/styles/colors.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import type { ReactNode } from 'react';
import { Providers } from './(main)/providers';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body className="bg-background text-foreground">
      <DesignSystemProvider>
        <Providers>{children}</Providers>
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
