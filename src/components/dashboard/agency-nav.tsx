import {
  Link,
  useLocation,
  useParams,
  useRouteContext,
  useRouterState,
  type ValidateToPath,
} from "@tanstack/react-router";
import {
  ChevronRight,
  CogIcon,
  HouseIcon,
  HousePlus,
  type LucideIcon,
  TableIcon,
  UsersIcon,
} from "lucide-react";
import type { ComponentProps } from "react";
import type { ClassNameValue } from "tailwind-merge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const AgencyNav = ({
  className,
  items,
}: {
  className?: ClassNameValue;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      icon?: LucideIcon;
      url: string;
    }[];
  }[];
}) => {
  const { member } = useRouteContext({ from: "/app/$organizationId" });
  const params = useParams({ from: "/app/$organizationId" });

  const { pathname } = useLocation();

  const matches = useRouterState({ select: (s) => s.matches });
  const matchesRoute = (route: ValidateToPath) =>
    matches.filter((match) => match.fullPath === route).length > 0;

  const defaultItems: ComponentProps<typeof AgencyNav>["items"] = [
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

  return (
    <>
      <SidebarGroup className={cn(className)}>
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

      <SidebarGroup className={cn(className)}>
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
    </>
  );
};
