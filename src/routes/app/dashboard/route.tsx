import { createFileRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/dashboard")({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    const activeOrganizationPromise = context.queryClient.fetchQuery(
      setActiveOrganizationQueryOptions({ organizationId: null }),
    );
    return { activeOrganizationPromise };
  },
});

function DashboardLayout() {
  return (
    <React.Suspense fallback={<div className="bg-blue-600">Loading...</div>}>
      <Outlet />
    </React.Suspense>
  );
}
