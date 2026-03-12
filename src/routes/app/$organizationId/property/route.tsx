import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/$organizationId/property")({
  beforeLoad: async ({ context, routeId }) => {
    return {
      breadcrumbs: [
        ...context.breadcrumbs,
        { label: "Properties", href: routeId },
      ],
    };
  },
  component: Outlet,
});
