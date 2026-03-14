import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useLocation, useRouteContext } from "@tanstack/react-router";
import {
  BookOpen,
  Bot,
  ChevronRight,
  HomeIcon,
  type LucideIcon,
  Settings2,
  SquareTerminal,
  UsersIcon,
} from "lucide-react";
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
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import { cn } from "@/lib/utils";

export const AgencyNav = ({
  className,
  items = [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
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

  const { pathname } = useLocation();

  return (
    <>
      <SidebarGroup>
        {(member.role === "owner" || member.role === "admin") && (
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UsersIcon />
              Invite
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarGroup>
      <SidebarGroup className={cn(className)}>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
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
                </SidebarMenuItem>
              }
            ></Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};
