import { Separator } from "@base-ui/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { AppSidebarCtxProvider } from "@/components/app-sidebar/context";
import { LoadingIndicator } from "@/components/app-sidebar/loading-indicator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";
import type { SignInRouteSearch } from "@/routes/(auth)/sign-in";

export const Route = createFileRoute("/_authed")({
  component: AuthedLayout,
  beforeLoad: async ({ context, location }) => {
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
    const activeOrganization = await context.queryClient.ensureQueryData(
      setActiveOrganizationQueryOptions({
        organizationId: session.session.activeOrganizationId,
      }),
    );
    return { session, activeOrganization };
  },
});

function AuthedLayout() {
  return (
    <AppSidebarCtxProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="relative flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <LoadingIndicator />
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
      </SidebarProvider>
    </AppSidebarCtxProvider>
  );
}
