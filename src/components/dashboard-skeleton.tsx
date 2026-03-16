import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "./ui/separator";

export function DashboardSkeleton() {
  return (
    <>
      <Sidebar className="**:data-[slot=skeleton]:bg-sidebar-accent">
        <SidebarHeader>
          <SidebarMenuButton className="px-0" size="lg">
            <Skeleton className="h-12 w-full" />
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="space-y-4">
            <SidebarGroupLabel>
              <SidebarMenuSkeleton />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuSkeleton className="w-4/5" showIcon />
                <SidebarMenuSkeleton className="w-5/8" showIcon />
                <SidebarMenuSkeleton className="w-5/7" showIcon />
                <SidebarMenuSkeleton className="w-4/5" showIcon />
                <SidebarMenuSkeleton className="w-5/7" showIcon />
                <SidebarMenuSkeleton className="w-5/8" showIcon />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-12 w-full opacity-75" />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-3 border-b bg-background px-3 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 *:data-[slot=skeleton]:bg-secondary lg:h-14">
          <Skeleton className="size-6" />
          <Separator orientation="vertical" />
          <Skeleton className="h-6 w-3/5" />
        </header>
      </SidebarInset>
    </>
  );
}
