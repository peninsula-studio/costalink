import { Separator } from "@base-ui/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import React from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import {
  getActiveOrganizationQueryOptions,
  listOrganizationsQueryOptions,
} from "@/lib/fn/organization";
import type { SignInRouteSearch } from "@/routes/(auth)/sign-in";

export const Route = createFileRoute("/app")({
  component: AppLayout,
  beforeLoad: async ({ context, location }) => {
    const session = await context.queryClient.fetchQuery(
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
    const organizations = await context.queryClient.ensureQueryData(
      listOrganizationsQueryOptions,
    );
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions,
    );
    return { session, organizations, activeOrganization };
  },
  pendingComponent: () => <Outlet />,
});

function AppLayout() {
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
          <main className="p-6">
            <React.Suspense>
              <Outlet />
            </React.Suspense>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AppSidebarCtxProvider>
  );
}
