"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Folder,
  FolderIcon,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import Link from "next/link";
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
      <ProjectsSidebarMenu />
    </SidebarGroup>
  );
}

const PROJECTS = [
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

function ProjectsSidebarMenu() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      {PROJECTS.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton
            render={
              <Link href={item.url || ""}>
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
