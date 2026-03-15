import {
  Link,
  useRouteContext,
  useRouterState,
  type ValidateToPath,
} from "@tanstack/react-router";
import { Building2Icon, SettingsIcon, UserIcon } from "lucide-react";
import type { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

export function AccountSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { user } = useRouteContext({ from: "/app/account" });

  const matches = useRouterState({ select: (s) => s.matches });
  const matchesRoute = (route: ValidateToPath) =>
    matches.filter((match) => match.fullPath === route).length > 0;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          render={<Link to="/app/account" />}
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link to={"/app/account"} />}>
                  <SettingsIcon /> Overview
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton render={<Link to={"/app/account"} />}>
                  <SettingsIcon /> Settings
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuButton render={<Link to={"/app/account"} />}>
                    Default Agency
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user.role === "admin" && (
          <SidebarGroup className="rounded-sm bg-destructive/5 pt-0 outline outline-destructive -outline-offset-1">
            <SidebarGroupLabel>Admin</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link to={"/app/admin/organization"} />}
                  >
                    <Building2Icon /> Agencies
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton render={<Link to={"/app/account"} />}>
                      Create Agency
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
