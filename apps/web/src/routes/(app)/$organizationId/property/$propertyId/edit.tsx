import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FlexContainer } from "@/components/container";
import { CreatePropertyForm } from "@/components/create-property-form";
import { RouteSkeleton } from "@/components/route-skeleton";
import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import { TypographyH2 } from "@repo/ui/components/typography";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import {
  getPropertyQueryOptions,
  updatePropertyMutationOptions,
} from "@/lib/fn/property";

export const Route = createFileRoute(
  "/(app)/$organizationId/property/$propertyId/edit",
)({
  loader: async ({ context, params }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );

    context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        userId: session.user.id,
        organizationId: params.organizationId,
      }),
    );

    context.queryClient.ensureQueryData(
      getPropertyQueryOptions({
        propertyId: params.propertyId,
        userId: params.organizationId,
      }),
    );
    return { session };
  },
  pendingComponent: RouteSkeleton,
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useLoaderData();
  const { organizationId, propertyId } = Route.useParams();

  const { data: member } = useSuspenseQuery(
    getActiveMemberQueryOptions({
      userId: session.user.id,
      organizationId,
    }),
  );

  const { data: property } = useSuspenseQuery(
    getPropertyQueryOptions({
      propertyId: propertyId,
      userId: session.user.id,
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
          <Link params={{ organizationId }} to="/$organizationId/property">
            Property list
          </Link>
        }
      />

      <FlexContainer className="items-center" gap="sm" padding="none">
        <CreatePropertyForm className="w-full max-w-2xl" />
      </FlexContainer>
    </FlexContainer>
  );
}
