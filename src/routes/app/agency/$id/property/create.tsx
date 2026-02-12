import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";

export const Route = createFileRoute("/app/agency/$id/property/create")({
  loader: async ({ context }) => {
    const member = await context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        userId: context.user.id,
        organizationId: context.activeOrganization.id,
      }),
    );
    return { member };
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
  const { activeOrganization } = Route.useRouteContext();
  const { member } = Route.useLoaderData();

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
            params={{ id: activeOrganization.id }}
            to="/app/agency/$id/property"
          >
            Property list
          </Link>
        }
      ></Button>
    </>
  );
}
