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
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";
import { sessionCookieMiddleware } from "@/middleware/auth";
import type { SignInRouteSearch } from "@/routes/_auth/sign-in";

export const Route = createFileRoute("/app")({
  server: {
    middleware: [sessionCookieMiddleware],
  },
  beforeLoad: async ({ context, location }) => {
    const session = await context.queryClient.ensureQueryData({
      ...getSessionQueryOptions(),
      revalidateIfStale: true,
    });
    // const sessionCookie = await $checkSessionCookieFn();
    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: {
          callbackUrl: location.pathname as SignInRouteSearch["callbackUrl"],
        },
      });
    }
    // context.queryClient.ensureQueryData({
    //   ...getActiveOrganizationQueryOptions({ userId: session.user.id }),
    //   revalidateIfStale: true,
    // });

    const organizationList = await context.queryClient.ensureQueryData(
      organizationListQueryOptions({ userId: session.user.id }),
    );
    return { user: session.user, organizationList };
  },
  pendingComponent: () => (
    <>
      <Sidebar>
        <SidebarHeader>
          <Skeleton className="h-12 w-full" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
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
        <main>
          <Outlet />
        </main>
      </SidebarInset>
    </>
  );
}
