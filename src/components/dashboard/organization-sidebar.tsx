import {
  Link,
  type LinkOptions,
  linkOptions,
  useParams,
  useRouteContext,
  useRouterState,
  type ValidateToPath,
} from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  HousePlus,
  ImportIcon,
  type LucideIcon,
  SettingsIcon,
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
  SidebarGroupContent,
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
  linkOptions?: LinkOptions;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    icon?: LucideIcon;
    linkOptions: LinkOptions;
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
      icon: TableIcon,
      title: "View properties",
      linkOptions: linkOptions({ to: "/app/$organizationId/property", params }),
    },
    {
      icon: HousePlus,
      title: "Create property",
      linkOptions: linkOptions({
        to: "/app/$organizationId/property/create",
        params,
      }),
    },
    {
      title: "Import Properties",
      icon: ImportIcon,
      linkOptions: linkOptions({
        to: "/app/$organizationId/property/import",
        params,
      }),
      isActive: matchesRoute("/app/$organizationId/property"),
      // items: [ ],
    },
  ];

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
          <SidebarGroupContent>
            <SidebarMenu>
              {defaultItems.map((item) =>
                item.items ? (
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
                              {item.title}
                              <ChevronRight className="ml-auto transition-transform duration-150 group-data-open/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          }
                        ></CollapsibleTrigger>
                        <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-all duration-150 data-ending-style:h-0 data-starting-style:h-0">
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  render={
                                    <Link {...subItem.linkOptions}>
                                      {subItem.icon && <subItem.icon />}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  }
                                ></SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    }
                  ></Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={
                        <Link {...item.linkOptions}>
                          {item.icon && <item.icon />}
                          {item.title}
                        </Link>
                      }
                    ></SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(member.role === "owner" || member.role === "admin") && (
          <SidebarGroup>
            <SidebarGroupLabel>Agency Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <Link
                        params={params}
                        to={"/app/$organizationId/settings"}
                      >
                        <SettingsIcon />
                        Settings
                      </Link>
                    }
                  ></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <Link
                        params={params}
                        to={"/app/$organizationId/settings"}
                      >
                        <UsersIcon />
                        Agents
                      </Link>
                    }
                  ></SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
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
