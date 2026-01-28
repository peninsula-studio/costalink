import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { Building2, ChevronsUpDown, UserIcon } from "lucide-react";
import { useAppSidebarCtx } from "@/components/app-sidebar/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { listOrganizationsQueryOptions } from "@/lib/fn/organization";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  const { session } = useRouteContext({ from: "/_authed" });

  const { data: organizations } = useSuspenseQuery(
    listOrganizationsQueryOptions,
  );

  const { activeOrganization, setActiveOrganization } = useAppSidebarCtx();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          // INFO: This is the only way to show loading state without unmounting the component and thus losing the fade out animation on the dropdown menu content
          activeOrganization === undefined ? (
            <SidebarMenuButton
              className="pointer-events-none **:data-[slot=skeleton]:bg-sidebar-accent"
              size="lg"
            >
              <Skeleton className="aspect-square size-8" />
              <div className="flex w-full flex-col gap-1">
                <Skeleton className="h-3 w-full max-w-14" />
                <Skeleton className="h-3 w-full max-w-32" />
              </div>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
              size="lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
                <UserIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeOrganization?.name || session.user.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          )
        }
      />
      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        className="w-(--anchor-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            aria-selected={!activeOrganization}
            className="gap-2 p-2"
            render={
              <Link
                onClick={() => setActiveOrganization(undefined)}
                preload={false}
                to="/dashboard"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <UserIcon className="size-3.5 shrink-0" />
                </div>
                {session.user.name}
                <DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
              </Link>
            }
          ></DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs">
            Organizations
          </DropdownMenuLabel>
          {/*   <OrganizationList activeOrganization={activeOrganization} /> */}
          {/* </Suspense> */}

          {organizations?.map((o, index) => (
            <DropdownMenuItem
              // aria-selected={o.id === activeOrganization?.id}
              aria-selected={o.id === activeOrganization?.id}
              className="gap-2 p-2"
              key={o.name}
              render={
                <Link
                  onClick={() => setActiveOrganization(undefined)}
                  params={{ tenant: o.slug }}
                  preload={false}
                  to="/s/$tenant"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Building2 className="size-3.5 shrink-0" />
                  </div>
                  {o.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </Link>
              }
            ></DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
