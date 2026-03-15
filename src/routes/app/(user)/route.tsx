import { Separator } from "@base-ui/react";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import React, { Suspense } from "react";
import { AppSkeleton } from "@/components/app-skeleton";
import { UserSidebar } from "@/components/dashboard/user-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";
import { sessionCookieMiddleware } from "@/middleware/auth";
import type { SignInRouteSearch } from "@/routes/_auth/sign-in";

export const Route = createFileRoute("/app/(user)")({
  server: {
    middleware: [sessionCookieMiddleware],
  },
  ssr: "data-only",
  beforeLoad: async ({ context, routeId }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    // const sessionCookie = await $checkSessionCookieFn();
    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: {
          callbackUrl: location.pathname as SignInRouteSearch["callbackUrl"],
        },
      });
    }

    return {
      user: session.user,
      breadcrumbs: [{ label: "Dashboard", href: routeId }],
    };
  },
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(
      organizationListQueryOptions({ userId: context.user.id }),
    );
  },
  pendingComponent: () => <AppSkeleton />,
  component: AppLayout,
});

function AppLayout() {
  const matches = useRouterState({ select: (s) => s.matches });

  const breadcrumbs = matches
    .filter((match) => match.context.breadcrumbs)
    .at(-1)?.context.breadcrumbs;

  return (
    <>
      <Suspense fallback={<div className="bg-red-400">Loading...</div>}>
        <UserSidebar />
      </Suspense>
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:h-14">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-vertical:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs?.map(({ label, href }, i) => (
                  <React.Fragment key={href}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        render={<Link to={href}>{label}</Link>}
                      ></BreadcrumbLink>
                    </BreadcrumbItem>
                    {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
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
