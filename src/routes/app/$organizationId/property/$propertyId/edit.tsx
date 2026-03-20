import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FlexContainer } from "@/components/container";
import { CreatePropertyForm } from "@/components/create-property-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import {
  getPropertyQueryOptions,
  updatePropertyMutationOptions,
} from "@/lib/fn/property";

export const Route = createFileRoute(
  "/app/$organizationId/property/$propertyId/edit",
)({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        userId: context.user.id,
        organizationId: params.organizationId,
      }),
    );

    // Also ensure the property data is loaded
    await context.queryClient.ensureQueryData(
      getPropertyQueryOptions({
        propertyId: params.propertyId,
        userId: params.organizationId,
      }),
    );
  },
  pendingComponent: () => (
    <FlexContainer>
      <div>LOADING PROPERTY...</div>
      <Skeleton className="h-12 w-sm" />
      <div className="flex w-full max-w-lg flex-col gap-y-2 bg-red-500 *:h-10">
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton className="size-20" />
    </FlexContainer>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const { organizationId } = Route.useParams();

  const { data: member } = useSuspenseQuery(
    getActiveMemberQueryOptions({
      userId: user.id,
      organizationId,
    }),
  );

  const { data: property } = useSuspenseQuery(
    getPropertyQueryOptions({
      propertyId: Route.useParams().propertyId,
      userId: session.session.activeOrganizationId || "",
    }),
  );

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
            params={{
              organizationId: session.session.activeOrganizationId || "",
            }}
            to="/app/$organizationId/property"
          >
            Property list
          </Link>
        }
      />

      <FlexContainer className="items-center" padding="none" gap="sm">
        <CreatePropertyForm
          className="w-full max-w-2xl"
          defaultValues={property}
        />
      </FlexContainer>
    </FlexContainer>
  );
}
