import { useSuspenseQuery } from "@tanstack/react-query";
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
import { organizationListQueryOptions } from "@/lib/fn/organization";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();

  const { activeOrganization, user } = useRouteContext({
    from: "/app/$agencyId",
  });

  const { data: organizationList } = useSuspenseQuery(
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
            {/* {agencyRoutes?.status === "pending" ? ( */}
            {/*   <> */}
            {/*     <Skeleton className="aspect-square size-8" /> */}
            {/*     <div className="flex w-full flex-col gap-1"> */}
            {/*       <Skeleton className="h-3 w-full max-w-14" /> */}
            {/*       <Skeleton className="h-3 w-full max-w-32" /> */}
            {/*     </div> */}
            {/*   </> */}
            {/* ) : ( */}
            <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
              <UserIcon className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {activeOrganization?.name || user.name}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent
        align={isMobile ? "center" : "start"}
        // className="w-(--anchor-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        <DropdownMenuGroup>
          {organizationList?.map((o, index) => (
            <DropdownMenuItem
              aria-selected={o.id === activeOrganization?.id}
              className="gap-2 p-2"
              key={o.name}
              render={
                <Link
                  params={{ agencyId: o.id }}
                  preload={false}
                  to="/app/$agencyId"
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
