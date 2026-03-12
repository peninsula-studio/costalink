import { useParams } from "@tanstack/react-router";
import { type ComponentProps, Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrganizationSwitcher } from "./organization-switcher";
import { ProjectsMenu } from "./projects-group";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const params = useParams({
    from: "/app/$organizationId",
    shouldThrow: false,
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Suspense>
          <OrganizationSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={undefined} />
        {/* {params?.organizationId && <NavMain items={undefined} />} */}
        <ProjectsMenu />
      </SidebarContent>
      <SidebarFooter>
        {params?.organizationId && <SidebarSeparator />}
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
