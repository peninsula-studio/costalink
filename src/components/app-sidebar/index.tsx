import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { type ComponentProps, Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getActiveOrganizationQueryOptions,
  listOrganizationsQueryOptions,
} from "@/lib/fn/organization";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrganizationSwitcher } from "./organization-switcher";
import { ProjectsMenu } from "./projects-group";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { user } = useRouteContext({ from: "/app" });

  const { data: organizations } = useQuery(listOrganizationsQueryOptions());
  const { data: activeOrganization } = useQuery(
    getActiveOrganizationQueryOptions({ userId: user.id }),
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher
          activeOrganization={activeOrganization}
          organizations={organizations}
          user={user}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={undefined} />
        <ProjectsMenu />
      </SidebarContent>
      <SidebarFooter>
        <Suspense
          fallback={
            <div className="flex flex-col gap-2">
              <Skeleton className="size-8" />
            </div>
          }
        >
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
