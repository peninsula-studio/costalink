import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import {
  Folder,
  FolderIcon,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import * as React from "react";
import type { ClassNameValue } from "tailwind-merge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function ProjectsMenu({ className }: { className?: ClassNameValue }) {
  return (
    <SidebarGroup
      className={cn("group-data-[collapsible=icon]:hidden", className)}
    >
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <React.Suspense
        fallback={
          <SidebarMenu className="w-full">
            {Array.from({ length: 3 }).map((_, index) => (
              <SidebarMenuItem
                className="w-full **:data-[slot=skeleton]:bg-sidebar-accent"
                key={`project-menu-skeleton-${index}`}
              >
                <SidebarMenuSkeleton />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        }
      >
        <ProjectsSidebarMenu />
      </React.Suspense>
    </SidebarGroup>
  );
}

function ProjectsSidebarMenu() {
  const { session } = useRouteContext({ from: "/_authed" });

  const { data: projects } = useSuspenseQuery({
    queryKey: ["teams", session.user.id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const data = [
        {
          name: "Design Engineering",
          url: "#",
        },
        {
          name: "Sales & Marketing",
          url: "#",
        },
        {
          name: "Travel",
          url: "#",
        },
      ];
      return data;
    },
  });

  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      {projects.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton
            render={
              <Link to={item.url || ""}>
                <FolderIcon />
                <span>{item.name}</span>
              </Link>
            }
          ></SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              }
            ></DropdownMenuTrigger>
            <DropdownMenuContent
              align={isMobile ? "end" : "start"}
              className="w-48 rounded-lg"
              side={isMobile ? "bottom" : "right"}
            >
              <DropdownMenuItem>
                <Folder className="text-muted-foreground" />
                <span>View Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Forward className="text-muted-foreground" />
                <span>Share Project</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="text-muted-foreground" />
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem>
        <SidebarMenuButton className="text-sidebar-foreground/70">
          <MoreHorizontal className="text-sidebar-foreground/70" />
          <span>More</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
