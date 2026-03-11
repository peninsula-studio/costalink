import { Separator } from "@base-ui/react";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
    console.log(session.session.activeOrganizationId);
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
  const matches = useRouterState({ select: (s) => s.matches });

  // const breadcrumbs = matches
  //   .filter((match) => match.context.breadcrumb)
  //   // .filter((match) => !match.routeId.endsWith("/"))
  //   .map(({ pathname, context }) => {
  //     return {
  //       label: context.breadcrumb,
  //       href: pathname,
  //     };
  //   });

  const breadcrumbs = matches
    .filter((match) => match.context.breadcrumbs)
    .at(-1)?.context.breadcrumbs;

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-vertical:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs?.map(({ label, href }, i) => (
                  <React.Fragment key={label}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        render={<Link to={href}>{label}</Link>}
                      ></BreadcrumbLink>
                    </BreadcrumbItem>
                    {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
                {/* <BreadcrumbItem className="hidden md:block"> */}
                {/*   <BreadcrumbLink href="#"> */}
                {/*     Building Your Application */}
                {/*   </BreadcrumbLink> */}
                {/* </BreadcrumbItem> */}
                {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                {/* <BreadcrumbItem> */}
                {/*   <BreadcrumbPage>Data Fetching</BreadcrumbPage> */}
                {/* </BreadcrumbItem> */}
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
