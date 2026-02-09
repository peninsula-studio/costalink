import { useIsFetching } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, ChevronsUpDown, UserIcon } from "lucide-react";
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
import type { auth } from "@/lib/auth";
import { organizationKeys } from "@/lib/fn/keys";

export function OrganizationSwitcher({
  // activeOrganization,
  organizations,
  user,
}: {
  activeOrganization: typeof auth.$Infer.ActiveOrganization | null | undefined;
  organizations: (typeof auth.$Infer.Organization)[] | undefined;
  user: (typeof auth.$Infer.Session)["user"];
}) {
  const { isMobile } = useSidebar();
  const isFetching = useIsFetching({
    queryKey: organizationKeys.active({ userId: user.id }),
  });
  const isFetching2 = useIsFetching({
    queryKey: organizationKeys.setActive({ userId: user.id }),
  });
  const pending = useRouterState({
    select: (state) => state.status === "pending",
  });

  const { activeOrganization } = useAppCtx();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground **:data-[slot=skeleton]:bg-sidebar-accent"
            size="lg"
          >
            {isFetching && isFetching2 && pending ? (
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
        // className="w-(--anchor-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "left"}
        sideOffset={4}
      >
        <DropdownMenuGroup>
          {organizations?.map((o, index) => (
            <DropdownMenuItem
              aria-selected={o.id === activeOrganization?.id}
              className="gap-2 p-2"
              key={o.name}
              render={
                <Link
                  params={{ slug: o.slug }}
                  preload={false}
                  to="/app/agency/$slug"
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
