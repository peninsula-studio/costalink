import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/s/$tenant")({
  component: TenantLayout,
  pendingComponent: () => (
    <div className="flex flex-col gap-y-6 p-4">
      <Skeleton className="h-12 w-md" />
      <div className="flex w-full gap-x-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  ),
  beforeLoad: async ({ context, params }) => {
    const activeOrganization = await context.queryClient.fetchQuery(
      setActiveOrganizationQueryOptions({ organizationSlug: params.tenant }),
    );
    return { activeOrganization };
  },
});

function TenantLayout() {
  return <Outlet />;
}
