import {
  useParams,
  useRouterState,
  type ValidateToPath,
} from "@tanstack/react-router";
import { HouseIcon, HousePlus, TableIcon } from "lucide-react";
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
import { OrganizationSidebarNavigation } from "./organization-sidebar-navigation";
import { OrganizationSwitcher } from "./organization-switcher";
import { ProjectsMenu } from "./projects-group";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const params = useParams({
    from: "/app/$organizationId",
    shouldThrow: false,
  });

  const matches = useRouterState({ select: (s) => s.matches });
  const matchesRoute = (route: ValidateToPath) =>
    matches.filter((match) => match.fullPath === route).length > 0;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Suspense>
          <OrganizationSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        {params && (
          <NavMain
            items={[
              {
                title: "Properties",
                icon: HouseIcon,
                url: "#",
                isActive: matchesRoute("/app/$organizationId/property"),
                items: [
                  {
                    icon: TableIcon,
                    title: "View properties",
                    url: `/app/${params.organizationId}/property`,
                  },
                  {
                    icon: HousePlus,
                    title: "Create property",
                    url: `/app/${params.organizationId}/property/create`,
                  },
                ],
              },
            ]}
          />
        )}
        {params && <OrganizationSidebarNavigation />}
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
