import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrganizationSwitcher } from "./organization-switcher";
import { ProjectsMenu } from "./projects-group";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <React.Suspense
          fallback={
            <SidebarMenu>
              <SidebarMenuButton
                className="pointer-events-none **:data-[slot=skeleton]:bg-sidebar-accent"
                size="lg"
              >
                <Skeleton className="aspect-square size-8" />
                <div className="flex w-full flex-col gap-1">
                  <Skeleton className="h-3 w-full max-w-14" />
                  <Skeleton className="h-3 w-full max-w-32" />
                </div>
              </SidebarMenuButton>
            </SidebarMenu>
          }
        >
          <OrganizationSwitcher />
        </React.Suspense>
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
