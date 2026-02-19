import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";

export const Route = createFileRoute("/app/$agencyId/property/create")({
  loader: async ({ context, params }) => {
    context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        userId: context.user.id,
        organizationId: params.agencyId,
      }),
    );
  },
  pendingComponent: () => (
    <>
      <div>LOADING PROPERTIES...</div>
      <Skeleton className="h-12 w-sm" />
      <div className="flex w-full max-w-lg flex-col gap-y-2 bg-red-500 *:h-10">
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton className="size-20" />
    </>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const { user, activeOrganization } = Route.useRouteContext();
  const { data: member } = useSuspenseQuery(
    getActiveMemberQueryOptions({
      userId: user.id,
      organizationId: activeOrganization.id,
    }),
  );

  return (
    <>
      <TypographyH2>
        Role: <i>{member.role}</i>
      </TypographyH2>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link
            params={{ agencyId: activeOrganization.id }}
            to="/app/$agencyId/property"
          >
            Property list
          </Link>
        }
      ></Button>
    </>
  );
}
