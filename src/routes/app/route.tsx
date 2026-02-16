import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Separator } from "@base-ui/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { $checkSessionCookieFn, getSessionQueryOptions } from "@/lib/fn/auth";
import { getActiveOrganizationQueryOptions } from "@/lib/fn/organization";
import { sessionCookieMiddleware } from "@/middleware/auth";
import type { SignInRouteSearch } from "@/routes/_auth/sign-in";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/app")({
  server: {
    middleware: [sessionCookieMiddleware],
  },
  beforeLoad: async ({ context, location }) => {
    const session = await context.queryClient.ensureQueryData({
      ...getSessionQueryOptions(),
      revalidateIfStale: true,
    });
    const sessionCookie = await $checkSessionCookieFn();
    if (!sessionCookie || !session) {
      throw redirect({
        to: "/sign-in",
        search: {
          callbackUrl: location.pathname as SignInRouteSearch["callbackUrl"],
        },
      });
    }
    context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: session.user.id }),
    );
    return { user: session.user };
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
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 px-4 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <Skeleton className="h-6 w-full" />
        </header>
        <div>/app ROUTE SUSPENSE</div>
      </SidebarInset>
    </>
  ),
  component: AppLayout,
});

function AppLayout() {
  return <Outlet />;
}
