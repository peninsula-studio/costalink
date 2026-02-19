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

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  const { user, organizationList } = useRouteContext({ from: "/app" });

  const params = useParams({
    from: "/app/$agencyId",
    shouldThrow: false,
  });

  // const { data: organizationList } = useSuspenseQuery(
  //   organizationListQueryOptions(),
  // );

  // const { data: activeOrganization } = useSuspenseQuery(
  //   getFullOrganizationQueryOptions({ organizationId: params?.agencyId }),
  // );

  const activeOrganization = organizationList.find(
    (o) => o.id === params?.agencyId,
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
              {params?.agencyId && activeOrganization ? (
                <Building2 className="size-4" />
              ) : (
                <UserIcon className="size-4" />
              )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {(params?.agencyId && activeOrganization?.name) || user.name}
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
                  to={"/app/$agencyId"}
                  params={{ agencyId: o.id }}
                  preload={false}
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

        <DropdownMenuSeparator />

        {params?.agencyId && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              render={
                <Link
                  to="/app/$agencyId"
                  params={{ agencyId: params.agencyId }}
                >
                  <Settings className="size-4 shrink-0" /> Agency Settings
                </Link>
              }
            ></DropdownMenuItem>
            <DropdownMenuItem
              render={
                <Link
                  to={`/app/$agencyId`}
                  params={{ agencyId: params.agencyId }}
                >
                  <UserPlus className="size-4 shrink-0" /> Invite Members
                </Link>
              }
            ></DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
