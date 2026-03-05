import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/$agencyId")({
  beforeLoad: async ({ context, params }) => {
    const activeOrganization = await context.queryClient.ensureQueryData({
      ...setActiveOrganizationQueryOptions({
        userId: context.user.id,
        organizationId: params.agencyId,
      }),
      revalidateIfStale: true,
    });
    if (!activeOrganization) throw redirect({ to: "/app" });
    return { activeOrganization };
  },
  // loader: async ({ context, params }) => {
  //   const fullOrganization = await context.queryClient.ensureQueryData(
  //     getFullOrganizationQueryOptions({ organizationId: params.agencyId }),
  //   );
  //   return { fullOrganization };
  // },
  pendingComponent: () => (
    <div className="flex flex-col gap-y-6 p-6">
      <Skeleton className="h-12 w-md" />
      <div className="flex w-full gap-x-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  ),
  component: OrganizationLayout,
});

function OrganizationLayout() {
  return <Outlet />;
}
