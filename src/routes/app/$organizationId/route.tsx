import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import React from "react";
import { OrganizationSidebar } from "@/components/dashboard/organization-sidebar";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { userKeys } from "@/lib/fn/keys";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";
import { getOrganizationPropertyListQueryOptions } from "@/lib/fn/property";

export const Route = createFileRoute("/app/$organizationId")({
  beforeLoad: async ({ context, params, routeId }) => {
    const activeOrganization = await context.queryClient.ensureQueryData({
      ...setActiveOrganizationQueryOptions({
        userId: context.user.id,
        organizationId: params.organizationId,
      }),
      revalidateIfStale: true,
    });

    if (
      context.session?.session.activeOrganizationId !== params.organizationId
    ) {
      console.log("revalidating session...");
      await Promise.all([
        context.queryClient.resetQueries({ queryKey: userKeys.session() }),
        context.queryClient.refetchQueries({ queryKey: userKeys.session() }),
      ]);
    }

    if (!activeOrganization) throw redirect({ to: "/app" });

    const member = await context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        organizationId: activeOrganization.id,
        userId: context.user.id,
      }),
    );

    if (!member) throw redirect({ to: "/app" });

    return {
      member,
      activeOrganization,
      breadcrumbs: [
        // ...context.breadcrumbs,
        { label: activeOrganization.name, href: routeId },
      ],
    };
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      getOrganizationPropertyListQueryOptions({
        organizationId: context.activeOrganization.id,
      }),
    );
  },
  pendingComponent: DashboardSkeleton,
  component: OrganizationLayout,
});

function OrganizationLayout() {
  const matches = useRouterState({ select: (s) => s.matches });

  const breadcrumbs = matches
    .filter((match) => match.context.breadcrumbs)
    .at(-1)?.context.breadcrumbs;

  return (
    <>
      <OrganizationSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-3 border-b bg-background px-3 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 lg:h-14">
          <SidebarTrigger />
          <Separator className="mr-2" orientation="vertical" />
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
        </header>

        <Outlet />
      </SidebarInset>
    </>
  );
}
