import { createFileRoute } from "@tanstack/react-router";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";
import { Skeleton } from "@/components/ui/skeleton";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/s/$tenant")({
  beforeLoad: ({ context, params }) => {
    context.queryClient.fetchQuery(
      setActiveOrganizationQueryOptions({ organizationSlug: params.tenant }),
    );
  },
  pendingComponent: () => (
<Outlet />
  ),
});
