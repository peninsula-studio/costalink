import { createFileRoute, Link } from "@tanstack/react-router";
import { FlexContainer } from "@/components/container";
import { CreatePropertyForm } from "@/components/create-property-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  pendingComponent: () => (
    <FlexContainer>
      <div>LOADING PROPERTIES...</div>
      <Skeleton className="h-12 w-sm" />
      <div className="flex w-full max-w-lg flex-col gap-y-2 *:h-10">
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton className="size-20" />
    </FlexContainer>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const { member, fullOrganization: activeOrganization } =
    Route.useLoaderData();

  return (
    <FlexContainer>
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

      <FlexContainer className="items-center" padding="none" spacing="sm">
        <CreatePropertyForm className="w-full max-w-2xl" />
      </FlexContainer>
    </FlexContainer>
  );
}
