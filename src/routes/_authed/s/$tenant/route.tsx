import { createFileRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/_authed/s/$tenant")({
  component: TenantLayout,
  beforeLoad: ({ context, params }) => {
    const activeOrganizationPromise = context.queryClient.fetchQuery(
      setActiveOrganizationQueryOptions({ organizationSlug: params.tenant }),
    );
    return { activeOrganizationPromise };
  },
});

function TenantLayout() {
  return (
    <main className="flex size-full flex-col gap-y-6 p-4">
      <React.Suspense
        fallback={
          <>
            <Skeleton className="h-12 w-md" />
            <div className="flex w-full gap-x-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </>
        }
      >
        <Outlet />
      </React.Suspense>
    </main>
  );
}
