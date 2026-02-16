import { Separator } from "@base-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { AppProvider } from "@/components/app-provider";
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
import { $checkSessionCookieFn, getSessionQueryOptions } from "@/lib/fn/auth";
import {
  getActiveOrganizationQueryOptions,
  organizationListQueryOptions,
} from "@/lib/fn/organization";
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
    const initialOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: session.user.id }),
    );
    return { user: session.user, initialOrganization };
  },
  // loader: async ({ context, route }) => {
  //   const activeOrganization = await context.queryClient.ensureQueryData(
  //     getActiveOrganizationQueryOptions({ userId: context.user.id }),
  //   );
  //   if (route.path === "/app" && activeOrganization) {
  //     throw redirect({
  //       to: "/app/$agencyId",
  //       params: { agencyId: activeOrganization.id },
  //     });
  //   }
  //   return { activeOrganization };
  // },
  pendingComponent: () => (
    <>
      <Sidebar>
        <SidebarHeader>
          <Skeleton className="h-12 w-full" />
        </SidebarHeader>
      </Sidebar>
      <SidebarInset className="bg-red-400">
        <header className="relative flex h-16 shrink-0 items-center gap-2 px-4 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <Skeleton className="h-6 w-full" />
        </header>
      </SidebarInset>
    </>
  ),
  component: AppLayout,
});

function AppLayout() {
  const { initialOrganization } = Route.useRouteContext();

  return (
    <AppProvider initialOrg={initialOrganization}>
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
    </AppProvider>
  );
}
