import { env } from '@repo/env';
import { VercelToolbar } from '@vercel/toolbar/next';
import type { ThemeProviderProps } from 'next-themes';
import { ModalProvider } from './components/modal/provider';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';
type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>
      <ModalProvider>{children}</ModalProvider>
    </TooltipProvider>
    <Toaster />
    {env.NODE_ENV === 'development' && env.FLAGS_SECRET && <VercelToolbar />}
  </ThemeProvider>
);
