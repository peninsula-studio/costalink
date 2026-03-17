import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { authMiddleware } from "@/middleware/auth";

export const Route = createFileRoute("/app")({
  ssr: "data-only",
  server: { middleware: [authMiddleware] },
  beforeLoad: async ({ context, routeId }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );

    return {
      // session,
      // user: session.user,
      breadcrumbs: [{ label: "Dashboard", href: routeId }],
    };
  },
  // loader: async ({ context }) => {
  //   context.queryClient.ensureQueryData(
  //     organizationListQueryOptions({ userId: context.user.id }),
  //   );
  // },
  pendingComponent: DashboardSkeleton,
  component: Outlet,
});
