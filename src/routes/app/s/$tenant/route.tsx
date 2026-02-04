import { createFileRoute } from "@tanstack/react-router";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/s/$tenant")({
  beforeLoad: ({ context, params }) => {
    context.queryClient.fetchQuery(
      setActiveOrganizationQueryOptions({ organizationSlug: params.tenant }),
    );
  },
});
