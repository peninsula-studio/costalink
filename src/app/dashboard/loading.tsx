import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Skeleton className="h-10 w-full" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="mt-2 gap-y-4">
            <Skeleton className="mb-2 h-6 w-4/5" />
            <Skeleton className="h-4 w-2/5 rounded-sm" />
            <Skeleton className="h-4 w-2/3 rounded-sm" />
            <Skeleton className="h-4 w-3/5 rounded-sm" />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-12 w-full" />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    <Skeleton className="h-[1em] w-[10cqw] rounded-sm" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Skeleton className="h-[1em] w-[15cqw] rounded-sm" />
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="size-full p-6">
          <Skeleton className="h-12 w-full max-w-md" />
        </div>
      </SidebarInset>
    </>
  );
}
