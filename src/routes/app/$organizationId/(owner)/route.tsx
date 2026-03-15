import { createFileRoute } from "@tanstack/react-router";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getOrganizationPermissionQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/$organizationId/(owner)")({
  beforeLoad: async ({ context }) => {
    const permission = await context.queryClient.ensureQueryData(
      getOrganizationPermissionQueryOptions({
        memberId: context.member.id,
        organization: ["update"],
      }),
    );
    if (permission.error) throw Route.redirect({ to: "../$organizationId" });
  },
  pendingComponent: () => <RouteSkeleton />,
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/$organizationId/(owner)"!</div>;
}
