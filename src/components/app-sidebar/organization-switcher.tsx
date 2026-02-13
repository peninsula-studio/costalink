"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Building2, ChevronsUpDown, UserIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import { authClient } from "@/lib/auth/client";
import { getFullOrganizationQueryOptions } from "@/lib/fn/query-options";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  const { user } = useAppCtx();
  const { data: organizations } = authClient.useListOrganizations();
  const params = useParams();

  const { data: activeOrganization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({
      organizationId: params.agencyId as string,
    }),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground **:data-[slot=skeleton]:bg-sidebar-accent"
            size="lg"
          >
            {
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
            }
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        <DropdownMenuGroup className="space-y-1">
          {organizations?.map((o, index) => (
            <DropdownMenuItem
              aria-selected={o.id === activeOrganization?.id}
              className="gap-2 p-2"
              key={o.name}
              nativeButton={false}
              render={
                <Link
                  className="w-full"
                  href={`/dashboard/${o.id}`}
                  // params={{ slug: o.slug }}
                  // preload={false}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
