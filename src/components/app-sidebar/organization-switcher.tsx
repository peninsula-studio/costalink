import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { Building2, ChevronsUpDown, UserIcon } from "lucide-react";
import React, { Suspense } from "react";
import { useAppCtx } from "@/components/app-provider";
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
  organizationListQueryOptions,
} from "@/lib/fn/organization";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground **:data-[slot=skeleton]:bg-sidebar-accent"
            size="lg"
          >
            <Suspense fallback={<Skeleton className="h-10 w-full" />}>
              <Trigger />
            </Suspense>
          </SidebarMenuButton>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        <DropdownMenuGroup className="space-y-1">
          <Suspense
            fallback={
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            }
          >
            <GroupContent />
          </Suspense>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Trigger() {
  const { user } = useRouteContext({ from: "/app" });
  const { data: activeOrganization } = useSuspenseQuery(
    getActiveOrganizationQueryOptions({ userId: user.id }),
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

  const { data: activeOrganization } = useSuspenseQuery(
    getActiveOrganizationQueryOptions({ userId: user.id }),
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
