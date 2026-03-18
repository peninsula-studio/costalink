import { createFileRoute, Link } from "@tanstack/react-router";
import { FlexContainer } from "@/components/container";
import { CreatePropertyForm } from "@/components/create-property-form";
import { RouteSkeleton } from "@/components/route-skeleton";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { TypographyH2 } from "@/components/ui/typography";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import { getFullOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/$organizationId/property/create")({
  loader: async ({ context, params }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );

    const fullOrganization = await context.queryClient.ensureQueryData(
      getFullOrganizationQueryOptions({
        organizationId: params.organizationId,
      }),
    );

    const member = await context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        userId: session.user.id,
        organizationId: params.organizationId,
      }),
    );

    return { member, session, fullOrganization };
  },
  pendingComponent: RouteSkeleton,
  component: RouteComponent,
});

function RouteComponent() {
  const { member, fullOrganization: activeOrganization } =
    Route.useLoaderData();

  return (
    <main className="flex w-full flex-col items-center p-md">
      <FlexContainer className="w-full max-w-5xl" spacing="sm">
        <FlexContainer spacing="xs">
          <TypographyH2>
            Role: <i>{member.role}</i>
          </TypographyH2>
          <Button
            className="w-fit"
            nativeButton={false}
            render={
              <Link
                params={{ organizationId: activeOrganization.id }}
                to="/app/$organizationId/property"
              >
                Property list
              </Link>
            }
          ></Button>
        </FlexContainer>

        <CreatePropertyForm className="w-full max-w-2xl" />
      </FlexContainer>
    </main>
  );
}
