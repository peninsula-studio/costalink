import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  FolderCode,
  HouseIcon,
  HousePlusIcon,
  ImportIcon,
  PlusIcon,
} from "lucide-react";
import { Suspense } from "react";
import { FlexContainer } from "@/components/container";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Item, ItemContent, ItemHeader, ItemMedia } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TypographyH2,
  TypographyH4,
  TypographyLarge,
} from "@/components/ui/typography";
import { getOrganizationPropertyListQueryOptions } from "@/lib/fn/property";

export const Route = createFileRoute("/app/$organizationId/")({
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
  const { activeOrganization } = Route.useRouteContext();
  const params = Route.useParams();

  return (
    <FlexContainer>
      <Item className="p-0">
        <ItemHeader className="justify-start">
          <ItemMedia variant="image">
            <img
              alt="placeholder logo"
              className="size-12 object-cover"
              src="/placeholder-mesh-gradient.svg"
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
    getOrganizationPropertyListQueryOptions({ organizationId }),
  );

  return (
    <>
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

          <Card className="group relative w-full min-w-xs max-w-82 pt-0 transition-shadow hover:shadow-3xl">
            <CardContent>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <HousePlusIcon />
                  </EmptyMedia>
                  <EmptyTitle className="text-lg">
                    Add more properties
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyContent>
                  <EmptyDescription>
                    You can add up to <b>{100 - properties.length}</b> more
                    properties to your portfolio to collaborate with other
                    agents.
                  </EmptyDescription>
                </EmptyContent>
              </Empty>
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
        </>
      )}
    </>
  );
};
