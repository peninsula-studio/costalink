import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getActiveOrganizationQueryOptions,
  setActiveOrganizationQueryOptions,
} from "@/lib/fn/organization";

export const Route = createFileRoute("/app/$agencyId")({
  beforeLoad: async ({ context, params }) => {
    let activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    if (activeOrganization?.id !== params.agencyId) {
      activeOrganization = await context.queryClient.fetchQuery(
        setActiveOrganizationQueryOptions({
          userId: context.user.id,
          organizationId: params.agencyId,
        }),
      );
      context.queryClient.resetQueries(
        getActiveOrganizationQueryOptions({ userId: context.user.id }),
      );
    }
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
  // const { activeOrganization } = Route.useRouteContext();

  return <Outlet />;
}
