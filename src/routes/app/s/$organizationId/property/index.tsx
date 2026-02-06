import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/components/ui/typography";
import { getActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/s/$organizationId/property/")({
  loader: async ({ context }) => {
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    if (!activeOrganization) throw redirect({ to: "/app" });
    return { activeOrganization };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { activeOrganization } = Route.useLoaderData();

  return (
    <>
      <TypographyLarge>
        Hello "/app/s/$organizationId/property/"!
      </TypographyLarge>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link
            params={{ organizationId: `${activeOrganization.id}` }}
            to="/app/s/$organizationId/property/create"
          >
            Property list
          </Link>
        }
      ></Button>
    </>
  );
}
