import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRightIcon,
  FolderCode,
  HouseIcon,
  ImportIcon,
  PlusIcon,
} from "lucide-react";
import { Suspense } from "react";
import { FlexContainer } from "@/components/container";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Item, ItemHeader, ItemMedia } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLarge,
} from "@/components/ui/typography";
import { getPropertiesQueryOptions } from "@/lib/fn/property";

export const Route = createFileRoute("/app/$agencyId/")({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(
      getPropertiesQueryOptions({
        organizationId: context.activeOrganization.id,
      }),
    );
  },
  pendingComponent: () => (
    <div className="flex flex-col gap-y-6 p-6">
      <Skeleton className="h-12 w-md" />
      <div className="flex w-full gap-x-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  ),
  component: OrganizationPage,
});

function OrganizationPage() {
  // const { agencyId } = Route.useParams();
  const { activeOrganization } = Route.useRouteContext();
  // const { data: activeOrganization } = useSuspenseQuery(
  //   getFullOrganizationQueryOptions({ organizationId: agencyId }),
  // );

  return (
    <FlexContainer>
      <div className="flex flex-col gap-y-4">
        <TypographyH2>{activeOrganization.name}</TypographyH2>
        <TypographyLarge>{activeOrganization.id}</TypographyLarge>
      </div>

      <Item className="flex flex-col gap-y-6">
        <TypographyH4 className="self-start">
          <ItemHeader>
            <ItemMedia variant="icon">
              <HouseIcon />
            </ItemMedia>
            Properties
          </ItemHeader>
        </TypographyH4>
        <Suspense fallback={<div>Loading...</div>}>
          <PropertyGrid organizationId={activeOrganization.id} />
        </Suspense>
      </Item>
    </FlexContainer>
  );
}

const PropertyGrid = ({ organizationId }: { organizationId: string }) => {
  const { agencyId } = Route.useParams();
  const { activeOrganization } = Route.useRouteContext();

  const { data: properties } = useSuspenseQuery(
    getPropertiesQueryOptions({ organizationId }),
  );

  return (
    <Item>
      {properties.length < 1 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>No Properties Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any properties yet. Get started by
              creating your first property.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button
              nativeButton={false}
              render={
                <Link
                  params={{ agencyId: activeOrganization.id }}
                  to="/app/$agencyId/property/create"
                >
                  <PlusIcon /> Add Property
                </Link>
              }
            ></Button>
            <Button
              nativeButton={false}
              render={
                <Link
                  params={{ agencyId }}
                  to={"/app/$agencyId/property/import"}
                >
                  <ImportIcon /> Import Properties
                </Link>
              }
              variant="outline"
            ></Button>
          </EmptyContent>
          <Button
            className="text-muted-foreground"
            nativeButton={false}
            render={
              <Link to="/app/admin">
                Learn More <ArrowUpRightIcon />
              </Link>
            }
            size="sm"
            variant="link"
          />
        </Empty>
      ) : (
        <>
          {properties.map((property) => (
            <Link
              key={property.id}
              params={{
                agencyId: property.organizationId,
                propertyId: property.id,
              }}
              to="/app/$agencyId/property/$propertyId"
            >
              <PropertyCard data={property} />
            </Link>
          ))}
          <Button>
            <PlusIcon /> Add Property
          </Button>
        </>
      )}
    </Item>
  );
};
