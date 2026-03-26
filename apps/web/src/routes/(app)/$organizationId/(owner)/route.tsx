import { createFileRoute } from "@tanstack/react-router";
import { RouteSkeleton } from "@/components/route-skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import { getOrganizationPermissionQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/(app)/$organizationId/(owner)")({
  beforeLoad: async ({ context, params }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    const member = await context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        userId: session.user.id,
        organizationId: params.organizationId,
      }),
    );
    const permission = await context.queryClient.ensureQueryData(
      getOrganizationPermissionQueryOptions({
        memberId: member.id,
        organization: ["update"],
      }),
    );
    if (permission.error) throw Route.redirect({ to: "/$organizationId" });
  },
  pendingComponent: () => <RouteSkeleton />,
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$organizationId/(owner)"!</div>;
}
