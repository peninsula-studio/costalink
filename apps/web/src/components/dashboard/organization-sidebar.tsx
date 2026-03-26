import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  type LinkOptions,
  linkOptions,
  useMatch,
  useParams,
} from "@tanstack/react-router";
import {
  BinocularsIcon,
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
} from "@repo/ui/components/collapsible";
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
} from "@repo/ui/components/sidebar";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import { getFullOrganizationQueryOptions } from "@/lib/fn/organization";
import { cn } from "@repo/ui/lib/utils";
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
  const params = useParams({ from: "/(app)/$organizationId" });

  const { data: session } = useSuspenseQuery(getSessionQueryOptions());

  const { data: activeOrganization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId: params.organizationId }),
  );

  const { data: member } = useSuspenseQuery(
    getActiveMemberQueryOptions({
      userId: session.user.id,
      organizationId: params.organizationId,
    }),
  );

  const collabItems: SidebarItem[] = [
    {
      icon: BinocularsIcon,
      title: "Search MLS",
      linkOptions: linkOptions({
        to: "/$organizationId/property/search",
        params,
      }),
      isActive: useMatch({
        from: "/(app)/$organizationId/property/search",
        shouldThrow: false,
      }),
    },
  ];

  const defaultItems: SidebarItem[] = [
    {
      icon: TableIcon,
      title: "View properties",
      linkOptions: linkOptions({ to: "/$organizationId/property", params }),
      isActive: useMatch({
        from: "/(app)/$organizationId/property/",
        shouldThrow: false,
      }),
    },
    {
      icon: HousePlus,
      title: "Create property",
      linkOptions: linkOptions({
        to: "/$organizationId/property/create",
        params,
      }),
      isActive: useMatch({
        from: "/(app)/$organizationId/property/create",
        shouldThrow: false,
      }),
    },
    {
      title: "Import Properties",
      icon: ImportIcon,
      linkOptions: linkOptions({
        to: "/$organizationId/property/import",
        params,
      }),
      isActive: useMatch({
        from: "/(app)/$organizationId/property/import",
        shouldThrow: false,
      }),
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          render={<Link params={params} to="/$organizationId" />}
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
        <SidebarGroup>
          <SidebarGroupLabel>Search Collab</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {collabItems.map((item) =>
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
                      isActive={item.isActive}
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
                      isActive={item.isActive}
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
            <SidebarGroupLabel>Agency</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <Link params={params} to={"/$organizationId/settings"}>
                        <SettingsIcon />
                        Settings
                      </Link>
                    }
                  ></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <Link params={params} to={"/$organizationId/settings"}>
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
