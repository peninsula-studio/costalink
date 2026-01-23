import { createFileRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { fullOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/_authed/s/$tenant")({
  component: TenantLayout,
  beforeLoad: async ({ context, params }) => {
    const fullOrganization = await context.queryClient.fetchQuery(
      fullOrganizationQueryOptions({ organizationSlug: params.tenant }),
    );
    return { fullOrganization };
  },
});

function TenantLayout() {
  // const { fullOrganization } = Route.useRouteContext();

  // const { setCurrentOrg } = useAppSidebarCtx();
  //
  // setCurrentOrg(fullOrganization);

  return (
    <main className="flex flex-col gap-y-6 p-4">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </React.Suspense>
    </main>
  );
}
