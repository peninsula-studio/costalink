import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import { listOrganizationsQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    context.queryClient.fetchQuery(listOrganizationsQueryOptions);
  },
});

function DashboardLayout() {
  return (
    <main className="p-6">
      <React.Suspense fallback={<div className="bg-blue-600">Loading...</div>}>
        <Outlet />
      </React.Suspense>
    </main>
  );
}
