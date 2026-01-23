import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useLocation, useRouteContext } from "@tanstack/react-router";
import { Building2, ChevronsUpDown, UserIcon } from "lucide-react";
import { useEffect, useEffectEvent } from "react";
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
import { organizationKeys } from "@/lib/fn/keys";
import {
  listOrganizationsQueryOptions,
  setActiveOrganizationFn,
} from "@/lib/fn/organization";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  const { session } = useRouteContext({ from: "/_authed" });

  const { pathname } = useLocation();

  const { data: organizations } = useSuspenseQuery(
    listOrganizationsQueryOptions(session.user.id),
  );

  const { data: activeOrganization, refetch } = useSuspenseQuery({
    queryKey: organizationKeys.setActiveOrganization({
      organizationSlug: pathname.split("/")[2],
      organizationId: pathname.split("/")[2] ? undefined : null,
    }),
    queryFn: async () =>
      await setActiveOrganizationFn({
        data: {
          organizationSlug: pathname.split("/")[2],
          organizationId: pathname.split("/")[2] ? undefined : null,
        },
      }),
  });

  const onNavigate = useEffectEvent((_path: string) => {
    refetch();
  });

  useEffect(() => {
    onNavigate(pathname);
  }, [pathname]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
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
              <Link to="/dashboard">
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

          {organizations.map((o, index) => (
            <DropdownMenuItem
              // aria-selected={o.id === activeOrganization?.id}
              aria-selected={o.id === activeOrganization?.id}
              className="gap-2 p-2"
              key={o.name}
              render={
                <Link params={{ tenant: o.slug }} to="/s/$tenant">
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
