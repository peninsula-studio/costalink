import { type ComponentProps, Suspense } from "react";
import { NavMain } from "@/components/app-sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { NavUser } from "./nav-user";
import { OrganizationSwitcher } from "./organization-switcher";
import { ProjectsMenu } from "./projects-group";

export async function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Suspense fallback={<Skeleton className="h-12 w-full" />}>
          <OrganizationSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={undefined} />
        <ProjectsMenu />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<div>Loading NavUser...</div>}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
