import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import {
  getActiveOrganizationQueryOptions,
  setActiveOrganizationQueryOptions,
} from "@/lib/fn/organization";

export const Route = createFileRoute("/app/s/$organizationId")({
  beforeLoad: async ({ context, params: { organizationId } }) => {
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    if (activeOrganization?.id !== organizationId) {
      await context.queryClient.fetchQuery(
        setActiveOrganizationQueryOptions({ organizationId }),
      );
      context.queryClient.invalidateQueries(getSessionQueryOptions());
      context.queryClient.resetQueries(
        getActiveOrganizationQueryOptions({ userId: context.user.id }),
      );
    }
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
  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Outlet />
    </main>
  );
}
