import {
  Link,
  useRouteContext,
  useRouterState,
  type ValidateToPath,
} from "@tanstack/react-router";
import { UserIcon } from "lucide-react";
import { type ComponentProps, Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { OrganizationlessNav } from "./organizationless-nav";

export function UserSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { user } = useRouteContext({ from: "/app" });

  const matches = useRouterState({ select: (s) => s.matches });
  const matchesRoute = (route: ValidateToPath) =>
    matches.filter((match) => match.fullPath === route).length > 0;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          render={<Link to="/app" />}
          size="lg"
          variant="primary"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary-foreground text-sidebar-primary">
            <UserIcon className="size-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate font-light text-xs">{user.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <Suspense>
          <OrganizationlessNav />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
