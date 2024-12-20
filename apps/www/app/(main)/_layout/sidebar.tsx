'use client';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/design-system/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@repo/design-system/components/ui/sidebar';
import { useIsMobile } from '@repo/design-system/hooks/use-mobile';
import { cn } from '@repo/design-system/lib/utils';
import {
  ArchiveX,
  ArrowLeftFromLineIcon,
  Calendar1Icon,
  ChevronRightIcon,
  Command,
  File,
  FolderIcon,
  Inbox,
  LifeBuoyIcon,
  MenuIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  Send,
  SendIcon,
  Settings2Icon,
  ShareIcon,
  SquareTerminalIcon,
  Trash2,
  Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';

const data: {
  navMain: {
    title: string;
    url: string;
    icon: React.ElementType;
    isActive: boolean;
  }[];
  navSub: {
    title: string;
    url: string;
    icon: React.ElementType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  projects: {
    name: string;
    url: string;
    icon: React.ElementType;
  }[];
  navSecondary: {
    title: string;
    url: string;
    icon: React.ElementType;
  }[];
} = {
  navMain: [
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
      isActive: true,
    },
    {
      title: 'Drafts',
      url: '#',
      icon: File,
      isActive: false,
    },
    {
      title: 'Sent',
      url: '#',
      icon: Send,
      isActive: false,
    },
    {
      title: 'Junk',
      url: '#',
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: 'Trash',
      url: '#',
      icon: Trash2,
      isActive: false,
    },
  ],
  navSub: [
    {
      title: 'Feed',
      url: '/',
      icon: SquareTerminalIcon,
      isActive: true,
      items: [
        {
          title: 'Latest',
          url: '/',
        },
        {
          title: 'Replies',
          url: '/',
        },
        {
          title: 'Quotes',
          url: '/',
        },
      ],
    },
    {
      title: 'Events',
      url: '/',
      icon: Calendar1Icon,
      items: [
        {
          title: 'Latest',
          url: '/',
        },
        {
          title: 'Calendar',
          url: '/',
        },
        {
          title: 'Create',
          url: '/',
        },
      ],
    },
    {
      title: 'Messages',
      url: '#',
      icon: MessageCircleIcon,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2Icon,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    // {
    //   name: 'Design Engineering',
    //   url: '#',
    //   icon: FrameIcon,
    // },
    // {
    //   name: 'Sales & Marketing',
    //   url: '#',
    //   icon: PieChartIcon,
    // },
    // {
    //   name: 'Travel',
    //   url: '#',
    //   icon: MapIcon,
    // },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoyIcon,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: SendIcon,
    },
  ],
};

export function GlobalSidebar({ children }: { children: React.ReactNode }) {
  const { open, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <>
      <Sidebar
        variant="floating"
        collapsible="icon"
        className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
        sidebarClassName="overflow-hidden"
        sidebarSheetClassName="border-sidebar-border"
      >
        <Sidebar
          collapsible="none"
          className="!w-[calc(var(--sidebar-width-icon)_+_1px)] bg-sidebar-background"
          onMouseEnter={() => {
            if (!open && !isMobile) {
              toggleSidebar();
            }
          }}
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                  <Link href="/">
                    <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Urbe</span>
                      <span className="truncate text-xs">Condita</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {data.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: isMobile,
                        }}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                {/* <UserButton
                showName
                appearance={{
                  elements: {
                    rootBox: 'flex overflow-hidden w-full',
                    userButtonBox: 'flex-row-reverse',
                    userButtonOuterIdentifier: 'truncate pl-0',
                  },
                }}
              /> */}
                <ModeToggle />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <Sidebar
          collapsible="none"
          className="!w-[calc(19rem_-_var(--sidebar-width-icon)_-_19px)] isolate hidden flex-1 overflow-clip bg-sidebar-primary/40 md:flex"
        >
          <SidebarHeader className="relative">
            {/* <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">Documentation</span>
                      <span className="">v1.0.0</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu> */}
            <Button
              onClick={() => toggleSidebar()}
              variant="ghost"
              size="icon"
              className="absolute top-1.5 right-1.5 z-10 h-8 w-8 text-sidebar-primary-foreground hover:bg-sidebar-accent"
            >
              <ArrowLeftFromLineIcon className="size-4" />
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                {data.navSub.map((item) => (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <CollapsibleTrigger asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </CollapsibleTrigger>
                      </SidebarMenuButton>
                      {item.items?.length ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                              <ChevronRightIcon />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub className="border-sidebar">
                              {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            {!!data.projects.length && (
              <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                <SidebarMenu>
                  {data.projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontalIcon />
                            <span className="sr-only">More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 border-background bg-layer-1"
                          side="bottom"
                          align="end"
                        >
                          <DropdownMenuItem>
                            <FolderIcon className="text-muted-foreground" />
                            <span>View Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShareIcon className="text-muted-foreground" />
                            <span>Share Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash2Icon className="text-muted-foreground" />
                            <span>Delete Project</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <MoreHorizontalIcon />
                      <span>More</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            )}
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.navSecondary.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </Sidebar>
      <SidebarInset className={cn('bg-unset pl-2 md:pl-0')}>
        {isMobile && (
          <Button
            size="icon"
            className="fixed right-3.5 bottom-3.5 z-50 size-12 rounded-full bg-layer-2 p-3 text-foreground shadow-lg hover:bg-layer-2-accent"
            onClick={() => toggleSidebar()}
          >
            <MenuIcon className="!size-5" />
          </Button>
        )}

        {children}
      </SidebarInset>
    </>
  );
}
