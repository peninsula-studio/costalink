import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function AppSkeleton() {
  return (
    <>
      <Sidebar className="**:data-[slot=skeleton]:bg-sidebar-accent">
        <SidebarHeader>
          <Skeleton className="h-12 w-full" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="space-y-4">
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-5/8" />
            <Skeleton className="h-6 w-5/7" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-5/7" />
            <Skeleton className="h-6 w-5/8" />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-12 w-full" />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 px-4 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <Skeleton className="h-6 w-full" />
        </header>
      </SidebarInset>
    </>
  );
}
