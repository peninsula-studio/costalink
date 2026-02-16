"use client";

import {
  Building2,
  ChevronsUpDown,
  PlusIcon,
  Settings,
  UserIcon,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppCtx } from "@/components/app-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();
  const params = useParams();
  const { user, organizationList } = useAppCtx();
  const activeOrganization = organizationList.find(
    (o) => o.id === params.agencyId,
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
                  <Building2 className="size-4 shrink-0" />
                  {o.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </Link>
              }
            ></DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          {params.agencyId && (
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link href={`/dashboard/${params.agencyId}/settings`}>
                    <Settings className="size-4 shrink-0" /> Agency Settings
                  </Link>
                }
              ></DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link href={`/dashboard/${params.agencyId}/settings`}>
                    <UserPlus className="size-4 shrink-0" /> Invite Members
                  </Link>
                }
              ></DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
