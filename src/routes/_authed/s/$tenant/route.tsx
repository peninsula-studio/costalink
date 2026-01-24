import { createFileRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { listOrganizationsQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/_authed/s/$tenant")({
  component: TenantLayout,
  beforeLoad: async ({ context, params }) => {
    const organizations = await context.queryClient.fetchQuery(
      listOrganizationsQueryOptions,
    );
    console.log(organizations.find((o) => o.slug === params.tenant));
  },
});

function TenantLayout() {
  return (
    <main className="flex flex-col gap-y-6 p-4">
      <React.Suspense fallback={<div className="bg-red-600">Loading...</div>}>
        <Outlet />
      </React.Suspense>
    </main>
  );
}
