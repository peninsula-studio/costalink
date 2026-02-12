import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useRouteContext } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { listOrganizationsQueryOptions } from "@/lib/fn/organization";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrganizationSwitcher } from "./organization-switcher";
import { ProjectsMenu } from "./projects-group";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { user } = useRouteContext({ from: "/app" });
  const { activeOrganization } = useLoaderData({ from: "/app" });

  const { data: organizations } = useQuery(listOrganizationsQueryOptions());

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher
          initialOrganization={activeOrganization}
          organizations={organizations}
          user={user}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={undefined} />
        <ProjectsMenu />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
