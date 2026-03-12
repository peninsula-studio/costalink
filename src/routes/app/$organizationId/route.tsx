import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { userKeys } from "@/lib/fn/keys";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";
import { getPropertiesQueryOptions } from "@/lib/fn/property";

export const Route = createFileRoute("/app/$organizationId")({
  beforeLoad: async ({ context, params, routeId }) => {
    const activeOrganization = await context.queryClient.ensureQueryData({
      ...setActiveOrganizationQueryOptions({
        userId: context.user.id,
        organizationId: params.organizationId,
      }),
      revalidateIfStale: true,
    });

    if (!activeOrganization) throw redirect({ to: "/app" });

    if (context.session?.session.activeOrganizationId !== params.organizationId) {
      context.queryClient.resetQueries({ queryKey: userKeys.session() });
    }

    return {
      activeOrganization,
      breadcrumbs: [
        // ...context.breadcrumbs,
        { label: activeOrganization.name, href: routeId },
      ],
    };
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      getPropertiesQueryOptions({
        organizationId: context.activeOrganization.id,
      }),
    );
  },
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
