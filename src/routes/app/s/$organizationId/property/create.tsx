import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import { getActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/s/$organizationId/property/create")({
  loader: async ({ context }) => {
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    if (!activeOrganization) throw redirect({ to: "/app" });
    const member = await context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        userId: context.user.id,
        organizationId: activeOrganization.id,
      }),
    );
    return { activeOrganization, member };
  },
  pendingComponent: () => (
    <>
      <Skeleton className="h-12 w-sm" />
      <div className="flex w-full max-w-lg flex-col gap-y-2 *:h-10">
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton className="size-20" />
    </>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const { activeOrganization, member } = Route.useLoaderData();

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
            params={{ organizationId: `${activeOrganization.id}` }}
            to="/app/s/$organizationId/property"
          >
            Property list
          </Link>
        }
      ></Button>
    </>
  );
}
