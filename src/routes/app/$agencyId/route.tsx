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
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    if (activeOrganization?.id !== params.agencyId) {
      context.queryClient
        .fetchQuery(
          setActiveOrganizationQueryOptions({
            userId: context.user.id,
            organizationId: params.agencyId,
          }),
        )
        .then(() => {
          context.queryClient.resetQueries(
            getActiveOrganizationQueryOptions({ userId: context.user.id }),
          );
        });
    }
    // if (!activeOrganization) throw redirect({ to: "/app" });
    // return { activeOrganization };
  },
  loader: async ({ context, params }) => {
    const fullOrganization = await context.queryClient.ensureQueryData(
      getFullOrganizationQueryOptions({ organizationId: params.agencyId }),
    );
    return { fullOrganization };
  },
  pendingComponent: () => (
    <>
      <div>/app/$agencyId ROUTE SUSPENSE</div>
    </>
  ),
  component: OrganizationLayout,
});

function OrganizationLayout() {
  // const { activeOrganization } = Route.useRouteContext();
  const { fullOrganization } = Route.useLoaderData();

  const { setActiveOrganization } = useAppCtx();

  useLayoutEffect(() => {
    setActiveOrganization(fullOrganization);
  }, [fullOrganization]);

  return <Outlet />;
}
