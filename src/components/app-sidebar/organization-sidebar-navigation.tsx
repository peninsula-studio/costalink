import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { organizationListQueryOptions } from "@/lib/fn/organization";

export function OrganizationSidebarNavigation() {
  const { user } = useRouteContext({ from: "/app" });

  const { data: organizationList } = useSuspenseQuery(
    organizationListQueryOptions({ userId: user.id }),
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Agencies</SidebarGroupLabel>
      {organizationList.map((org) => (
        <Collapsible
          key={org.id}
          render={
            <SidebarMenuItem>
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton>
                    {org.name}
                    <ChevronRight className="ml-auto transition-transform duration-150 group-data-open/collapsible:rotate-90" />
                  </SidebarMenuButton>
                }
              ></CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      render={
                        <Link
                          params={{ organizationId: org.id }}
                          to={"/app/$organizationId/property"}
                        >
                          <span>Properties</span>
                        </Link>
                      }
                    ></SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          }
        ></Collapsible>
      ))}
    </SidebarGroup>
  );
}
