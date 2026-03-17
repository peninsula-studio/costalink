import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  FolderCode,
  HousePlusIcon,
  ImportIcon,
  PlusIcon,
} from "lucide-react";
import { Suspense } from "react";
import { FlexContainer } from "@/components/container";
import { PropertyCard } from "@/components/property-card";
import { RouteSkeleton } from "@/components/route-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Item, ItemContent, ItemHeader, ItemMedia } from "@/components/ui/item";
import {
  TypographyH2,
  TypographyH4,
  TypographyLarge,
} from "@/components/ui/typography";
import { PLACEHOLDER_AGENCY_LOGO } from "@/lib/constants";
import { getFullOrganizationQueryOptions } from "@/lib/fn/organization";
import { getOrganizationPropertyListQueryOptions } from "@/lib/fn/property";

export const Route = createFileRoute("/app/$organizationId/")({
  pendingComponent: RouteSkeleton,
  component: OrganizationPage,
});

function OrganizationPage() {
  const params = Route.useParams();

  const { data: activeOrganization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId: params.organizationId }),
  );

  return (
    <FlexContainer render={<main></main>}>
      <Item className="p-0">
        <ItemHeader className="justify-start">
          <ItemMedia variant="image">
            <img
              alt={PLACEHOLDER_AGENCY_LOGO.alt}
              className="size-12 object-cover"
              src={PLACEHOLDER_AGENCY_LOGO.src}
            />
          </ItemMedia>
          <TypographyH2>{activeOrganization.name}</TypographyH2>
        </ItemHeader>
        <ItemContent>
          <TypographyLarge>{activeOrganization.id}</TypographyLarge>
        </ItemContent>
      </Item>

      <FlexContainer className="flex-row flex-wrap" padding="none" spacing="sm">
        <Item className="p-0">
          <ItemHeader className="justify-start">
            <TypographyH4>Properties</TypographyH4>
          </ItemHeader>
          <ItemContent>
            <Button
              className="w-fit"
              nativeButton={false}
              render={
                <Link params={params} to="/app/$organizationId/property">
                  View all <ArrowRightIcon />
                </Link>
              }
              variant="default"
            ></Button>
          </ItemContent>
        </Item>
        <Item className="p-0">
          <ItemContent></ItemContent>
        </Item>

        <Suspense fallback={<div>Loading...</div>}>
          <PropertyGrid organizationId={activeOrganization.id} />
        </Suspense>
      </FlexContainer>
    </FlexContainer>
  );
}

const PropertyGrid = ({ organizationId }: { organizationId: string }) => {
  const params = Route.useParams();

  const { data: properties } = useSuspenseQuery(
    getOrganizationPropertyListQueryOptions({ organizationId, pageSize: 10 }),
  );

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {properties.length < 1 ? (
        <Card className="group relative w-full min-w-xs max-w-82 pt-0 transition-shadow hover:shadow-3xl">
          <CardContent>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderCode />
                </EmptyMedia>
                <EmptyTitle className="text-lg">No Properties Yet</EmptyTitle>
              </EmptyHeader>
              <EmptyContent>
                <EmptyDescription>
                  You haven&apos;t created any properties yet. Get started by
                  creating your first property.
                </EmptyDescription>
              </EmptyContent>
            </Empty>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="w-full"
              nativeButton={false}
              render={
                <Link params={params} to="/app/$organizationId/property/create">
                  <PlusIcon /> Add Property
                </Link>
              }
            ></Button>
            <Button
              className="w-full"
              nativeButton={false}
              render={
                <Link
                  params={params}
                  to={"/app/$organizationId/property/import"}
                >
                  <ImportIcon /> Import Properties
                </Link>
              }
              variant="outline"
            ></Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          {properties.map((property) => (
            <Link
              className="w-full min-w-40"
              key={property.id}
              params={{
                organizationId: property.organizationId,
                propertyId: property.id,
              }}
              to="/app/$organizationId/property/$propertyId"
            >
              <PropertyCard data={property} />
            </Link>
          ))}

          <Card className="group transition-shadow hover:shadow-3xl">
            <CardHeader>
              <HousePlusIcon className="mx-auto size-6 stroke-primary" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg">Add more properties</CardTitle>
              <CardDescription>
                Add up to <b>{100 - properties.length}</b> additional properties
                to your portfolio.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                className="w-full"
                nativeButton={false}
                render={
                  <Link
                    params={params}
                    to="/app/$organizationId/property/create"
                  >
                    <PlusIcon data-icon="inline-start" />
                    Add Property
                  </Link>
                }
              ></Button>
              <Button
                className="w-full"
                nativeButton={false}
                render={
                  <Link
                    params={params}
                    to={"/app/$organizationId/property/import"}
                  >
                    <ImportIcon data-icon="inline-start" /> Import Properties
                  </Link>
                }
                variant="outline"
              ></Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};
