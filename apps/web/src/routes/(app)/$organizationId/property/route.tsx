import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RouteSkeleton } from "@/components/route-skeleton";

export const Route = createFileRoute("/(app)/$organizationId/property")({
  beforeLoad: async ({ context, routeId }) => {
    return {
      breadcrumbs: [
        ...context.breadcrumbs,
        { label: "Properties", href: routeId },
      ],
    };
  },
  pendingComponent: RouteSkeleton,
  component: Outlet,
});
