import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";
import type { SignInRouteSearch } from "@/routes/_auth/sign-in";

export const Route = createFileRoute("/app")({
  ssr: "data-only",
  // server: { middleware: [sessionRequiredMiddleware] },
  beforeLoad: async ({ context, routeId }) => {
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

    return {
      session,
      user: session.user,
      breadcrumbs: [{ label: "Dashboard", href: routeId }],
    };
  },
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(
      organizationListQueryOptions({ userId: context.user.id }),
    );
  },
  pendingComponent: DashboardSkeleton,
  component: Outlet,
});
