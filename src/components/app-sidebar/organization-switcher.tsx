import { useIsFetching, useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { Building2, ChevronsUpDown, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getActiveOrganizationQueryOptions,
  listOrganizationsQueryOptions,
} from "@/lib/fn/organization";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();
  const { user } = useRouteContext({ from: "/app" });

  const { data: organizations } = useQuery(listOrganizationsQueryOptions());
  const { data: activeOrganization, isFetching } = useQuery(
    getActiveOrganizationQueryOptions({ userId: user.id }),
  );

  const setActiveFetching = useIsFetching({
    queryKey: ["organization", "setActive"],
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
            size="lg"
          >
            {isFetching || setActiveFetching ? (
              <>
                <Skeleton className="aspect-square size-8" />
                <div className="flex w-full flex-col gap-1">
                  <Skeleton className="h-3 w-full max-w-14" />
                  <Skeleton className="h-3 w-full max-w-32" />
                </div>
              </>
            ) : (
              <>
                <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
                  <UserIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeOrganization?.name || user.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </>
            )}
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        className="w-(--anchor-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        {/* <DropdownMenuGroup>
          <DropdownMenuItem
            // aria-selected={!activeOrganization}
            className="gap-2 p-2"
            render={
              <Link preload={false} to="/app">
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <UserIcon className="size-3.5 shrink-0" />
                </div>
                {session.user.name}
                <DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
              </Link>
            }
          ></DropdownMenuItem>
        </DropdownMenuGroup> */}

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuGroup>
          {/* <DropdownMenuLabel className="text-muted-foreground text-xs">
            Organizations
          </DropdownMenuLabel> */}
          {organizations?.map((o, index) => (
            <DropdownMenuItem
              // aria-selected={o.id === activeOrganization?.id}
              aria-selected={o.id === activeOrganization?.id}
              className="gap-2 p-2"
              key={o.name}
              render={
                <Link
                  params={{ organizationSlug: o.slug }}
                  preload={false}
                  to="/app/s/$organizationSlug"
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

        {/* <React.Suspense fallback={<div>Loading...</div>}> */}
        {/*   <OrgList /> */}
        {/* </React.Suspense> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
