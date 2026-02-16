import { useIsFetching, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams, useRouteContext } from "@tanstack/react-router";
import type { User } from "better-auth";
import { Building2, ChevronsUpDown, UserIcon } from "lucide-react";
import React, { Suspense } from "react";
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
import type { auth } from "@/lib/auth";
import { organizationKeys } from "@/lib/fn/keys";
import {
  getFullOrganizationQueryOptions,
  organizationListQueryOptions,
} from "@/lib/fn/organization";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  const { user } = useRouteContext({ from: "/app" });
  const { agencyId } = useParams({ from: "/app/$agencyId" });

  const { data: activeOrganization } = useQuery(
    getFullOrganizationQueryOptions({ organizationId: agencyId }),
  );
  const { data: organizationList } = useQuery(
    organizationListQueryOptions(),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground **:data-[slot=skeleton]:bg-sidebar-accent"
            size="lg"
          >
            <Trigger />
          </SidebarMenuButton>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        <DropdownMenuGroup className="space-y-1">
          <GroupContent />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Trigger() {
  const { agencyId } = useParams({ from: "/app/$agencyId" });
  const { user } = useRouteContext({ from: "/app/$agencyId" });
  const { data: activeOrganization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId: agencyId }),
  );

  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
        {activeOrganization ? (
          <Building2 className="size-4" />
        ) : (
          <UserIcon className="size-4" />
        )}
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">
          {activeOrganization?.name || user.name}
        </span>
      </div>
      <ChevronsUpDown className="ml-auto" />
    </>
  );
}

function GroupContent() {
  const { user } = useRouteContext({ from: "/app" });
  const { agencyId } = useParams({ from: "/app/$agencyId" });

  const { data: activeOrganization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId: agencyId }),
  );
  const { data: organizationList } = useSuspenseQuery(
    organizationListQueryOptions(),
  );

  return (
    <>
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
    </>
  );
}
