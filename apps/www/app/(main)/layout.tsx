import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import type { ReactNode } from 'react';
import { ContainerQueriesHelper } from './_layout/container-queries-helper';
import { GlobalSidebar } from './_layout/sidebar';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProperties) => {
  return (
    <SidebarProvider
      className="bg-background"
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <GlobalSidebar>
        <div className="@container/main h-full w-full flex-1 overflow-y-auto p-2 pl-0">
          {children}
          <ContainerQueriesHelper />
        </div>
      </GlobalSidebar>
    </SidebarProvider>
  );
};

export default AppLayout;
