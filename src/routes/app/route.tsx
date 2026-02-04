import { Separator } from "@base-ui/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import {
  getActiveOrganizationQueryOptions,
  listOrganizationsQueryOptions,
} from "@/lib/fn/organization";
import type { SignInRouteSearch } from "@/routes/(auth)/sign-in";
import { authMiddleware } from "@/middleware/auth";

export const Route = createFileRoute("/app")({
  server: {
    middleware: [authMiddleware],
  },
  beforeLoad: async ({ context, location, serverContext }) => {
    // if(!serverContext?.session) throw redirect({to:"/sign-in"})
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: {
          callbackUrl: location.pathname as SignInRouteSearch["callbackUrl"],
        },
      });
    }
    context.queryClient.ensureQueryData(listOrganizationsQueryOptions());
    context.queryClient.ensureQueryData(getActiveOrganizationQueryOptions);
    return { session };
  },
    pendingComponent: () => (
    <>
      <Sidebar className="flex min-h-lvh min-w-full">
        <SidebarHeader>
          <Skeleton className="h-12 w-full" />
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 px-4 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <Skeleton className="h-6 w-full" />
        </header>
        <Outlet />
      </SidebarInset>
    </>
  ),
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <AppSidebar />
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
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </>
  );
}
