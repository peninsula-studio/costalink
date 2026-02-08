import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { useAppCtx } from "@/components/app-provider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getActiveOrganizationQueryOptions,
  getFullOrganizationQueryOptions,
  setActiveOrganizationQueryOptions,
} from "@/lib/fn/organization";

export const Route = createFileRoute("/app/agency/$slug")({
  beforeLoad: async ({ context, params }) => {
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    if (activeOrganization?.slug !== params.slug) {
      context.queryClient
        .fetchQuery(
          setActiveOrganizationQueryOptions({
            userId: context.user.id,
            organizationSlug: params.slug,
          }),
        )
        .then(() =>
          context.queryClient.resetQueries(
            getActiveOrganizationQueryOptions({ userId: context.user.id }),
          ),
        );
      // activeOrganization = await context.queryClient.ensureQueryData(
      //   getFullOrganizationQueryOptions({ organizationSlug: params.slug }),
      // );
    }
    if (!activeOrganization) throw redirect({ to: "/app" });
    // return { activeOrganization };
  },
  loader: async ({ context, params }) => {
    const activeOrganization = await context.queryClient.ensureQueryData(
      getFullOrganizationQueryOptions({ organizationSlug: params.slug }),
    );
    return { activeOrganization };
  },
  pendingComponent: () => (
    <div className="flex flex-col gap-y-6 p-6">
      LOADING SLUG ROUTE...
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
  const { activeOrganization } = Route.useLoaderData();
  const { setActiveOrganization } = useAppCtx();
  useLayoutEffect(() => {
    setActiveOrganization(activeOrganization);
  }, [activeOrganization, setActiveOrganization]);

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Outlet />
    </main>
  );
}
