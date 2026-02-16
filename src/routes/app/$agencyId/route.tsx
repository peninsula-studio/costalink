import {
  createFileRoute,
  Outlet,
  redirect,
  useLayoutEffect,
} from "@tanstack/react-router";
import { useAppCtx } from "@/components/app-provider";
import {
  getActiveOrganizationQueryOptions,
  getFullOrganizationQueryOptions,
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
  loader: async ({ context, params }) => {
    context.queryClient.ensureQueryData(
      getFullOrganizationQueryOptions({ organizationId: params.agencyId }),
    );
  },
  pendingComponent: () => (
    <>
      <div>/app/$agencyId ROUTE SUSPENSE</div>
    </>
  ),
  component: OrganizationLayout,
});

function OrganizationLayout() {
  const { activeOrganization } = Route.useRouteContext();

  const { setActiveOrganization } = useAppCtx();

  useLayoutEffect(() => {
    setActiveOrganization(activeOrganization);
  }, [activeOrganization]);

  return <Outlet />;
}
