import { createFileRoute, redirect } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { organizationKeys } from "@/lib/fn/keys";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/s/$tenant")({
  beforeLoad: async ({ context, params }) => {
    const activeOrganization = await context.queryClient.ensureQueryData({
      ...setActiveOrganizationQueryOptions({ organizationSlug: params.tenant }),
      revalidateIfStale: true,
    });
    if (!activeOrganization) throw redirect({ to: "/app" });
    return { activeOrganization };
  },
  pendingComponent: () => (
    <div className="flex flex-col gap-y-6 p-4">
      <Skeleton className="h-12 w-md" />
      <div className="flex w-full gap-x-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  ),
});
