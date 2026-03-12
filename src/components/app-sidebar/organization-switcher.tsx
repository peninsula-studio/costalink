import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams, useRouteContext } from "@tanstack/react-router";
import {
  Building2,
  ChevronsUpDown,
  Settings,
  UserIcon,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { organizationListQueryOptions } from "@/lib/fn/organization";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  const { user } = useRouteContext({ from: "/app" });

  const params = useParams({
    from: "/app/$organizationId",
    shouldThrow: false,
  });

  const { data: organizationList } = useSuspenseQuery(
    organizationListQueryOptions({ userId: user.id }),
  );

  const activeOrganization = organizationList.find(
    (o) => o.id === params?.organizationId,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground **:data-[slot=skeleton]:bg-sidebar-accent"
            size="lg"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
              {params?.organizationId && activeOrganization ? (
                <Building2 className="size-4" />
              ) : (
                <UserIcon className="size-4" />
              )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {(params?.organizationId && activeOrganization?.name) || user.name}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        <DropdownMenuGroup className="space-y-1">
          {organizationList?.map((o, index) => (
            <DropdownMenuItem
              aria-selected={o.id === activeOrganization?.id}
              className="gap-2 p-2"
              key={o.name}
              nativeButton={false}
              render={
                <Link
                  className="w-full"
                  params={{ organizationId: o.id }}
                  preload={false}
                  to={"/app/$organizationId"}
                  // onMouseDown={async () => {
                  //   // await $setActiveOrganization({ organizationSlug: o.slug })
                  //   await authClient.organization
                  //     .setActive({
                  //       organizationSlug: o.slug,
                  //     })
                  //     .then(() => router.refresh());
                  // }}
                  type="button"
                >
                  <Building2 className="size-3.5 shrink-0" />
                  {o.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </Link>
              }
            ></DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {params?.organizationId && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link
                    params={{ organizationId: params.organizationId }}
                    to="/app/$organizationId"
                  >
                    <Settings className="size-4 shrink-0" /> Agency Settings
                  </Link>
                }
              ></DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link
                    params={{ organizationId: params.organizationId }}
                    to={`/app/$organizationId`}
                  >
                    <UserPlus className="size-4 shrink-0" /> Invite Members
                  </Link>
                }
              ></DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
