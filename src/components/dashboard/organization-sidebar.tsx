import {
  Link,
  useParams,
  useRouteContext,
  useRouterState,
  type ValidateToPath,
} from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  CogIcon,
  HouseIcon,
  HousePlus,
  type LucideIcon,
  TableIcon,
  UsersIcon,
} from "lucide-react";
import type { ComponentProps } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NavUser } from "./nav-user";

type SidebarItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    icon?: LucideIcon;
    url: string;
  }[];
};

export function OrganizationSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const params = useParams({ from: "/app/$organizationId" });

  const { activeOrganization, member } = useRouteContext({
    from: "/app/$organizationId",
  });

  const matches = useRouterState({ select: (s) => s.matches });
  const matchesRoute = (route: ValidateToPath) =>
    matches.filter((match) => match.fullPath === route).length > 0;

  const defaultItems: SidebarItem[] = [
    {
      title: "Properties",
      icon: HouseIcon,
      url: "#",
      isActive: matchesRoute("/app/$organizationId/property"),
      // items: [ ],
    },
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
  ];

  const items: SidebarItem[] = [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          render={<Link params={params} to="/app/$organizationId" />}
          size="lg"
          variant="primary"
        >
          <div className="flex aspect-square h-full items-center justify-center rounded bg-sidebar-primary-foreground text-sidebar-primary transition-colors group-data-[collapsible=icon]:bg-sidebar-primary group-data-[collapsible=icon]:text-sidebar-primary-foreground">
            <Building2 className="size-full" />
          </div>
          <span className="truncate font-medium">
            {activeOrganization.name}
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {/* <AgencyNav items={[{ title: "Test", isActive: false, url: "#" }]} /> */}
        <SidebarGroup>
          <SidebarGroupLabel>Properties</SidebarGroupLabel>
          <SidebarMenu>
            {defaultItems.map((item) => (
              <Collapsible
                className="group/collapsible"
                defaultOpen={item.isActive}
                key={item.title}
                render={
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton
                          className={cn({
                            "bg-sidebar-accent": item.isActive,
                          })}
                          tooltip={item.title}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          {item.items && (
                            <ChevronRight className="ml-auto transition-transform duration-150 group-data-open/collapsible:rotate-90" />
                          )}
                        </SidebarMenuButton>
                      }
                    ></CollapsibleTrigger>
                    {item.items && (
                      <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-all duration-150 data-ending-style:h-0 data-starting-style:h-0">
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                render={
                                  <Link to={subItem.url}>
                                    {subItem.icon && <subItem.icon />}
                                    <span>{subItem.title}</span>
                                  </Link>
                                }
                              ></SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                }
              ></Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
          {items && (
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible
                  className="group/collapsible"
                  defaultOpen={item.isActive}
                  key={item.title}
                  render={
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        render={
                          <SidebarMenuButton
                            className={cn({
                              "bg-sidebar-accent": item.isActive,
                            })}
                            tooltip={item.title}
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            {item.items && (
                              <ChevronRight className="ml-auto transition-transform duration-150 group-data-open/collapsible:rotate-90" />
                            )}
                          </SidebarMenuButton>
                        }
                      ></CollapsibleTrigger>
                      {item.items && (
                        <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-all duration-150 data-ending-style:h-0 data-starting-style:h-0">
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  render={
                                    <Link to={subItem.url}>
                                      {subItem.icon && <subItem.icon />}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  }
                                ></SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  }
                ></Collapsible>
              ))}
            </SidebarMenu>
          )}
        </SidebarGroup>

        {(member.role === "owner" || member.role === "admin") && (
          <SidebarGroup>
            <SidebarGroupLabel>Agency Management</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <CogIcon />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UsersIcon />
                Agents
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        {params?.organizationId && <SidebarSeparator />}
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
