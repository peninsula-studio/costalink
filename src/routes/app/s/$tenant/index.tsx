import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRightIcon,
  FolderCode,
  HouseIcon,
  ImportIcon,
  PlusIcon,
} from "lucide-react";
import * as React from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  TypographyH2,
  TypographyH3,
  TypographyLarge,
} from "@/components/ui/typography";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";
import { getPropertiesQueryOptions } from "@/lib/fn/property";

export const Route = createFileRoute("/app/s/$tenant/")({
  pendingComponent: () => (
    <div className="flex flex-col gap-y-6 p-4">
      <Skeleton className="h-12 w-md" />
      <div className="flex w-full gap-x-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  ),
  component: TenantPage,
});

function TenantPage() {
  const { tenant } = Route.useParams();

  const { data: activeOrganization } = useSuspenseQuery(
    setActiveOrganizationQueryOptions({ organizationSlug: tenant }),
  );

  if (!activeOrganization) return null;

  return (
    <main className="flex size-full flex-col gap-y-6 p-6">
      <TypographyH2>{activeOrganization.name}</TypographyH2>
      <TypographyLarge>{activeOrganization.id}</TypographyLarge>

      <section className="flex flex-col gap-y-6">
        <TypographyH3 className="inline-flex">
          <HouseIcon className="inline-flex" /> Properties
        </TypographyH3>
        <React.Suspense fallback={<div>Loading...</div>}>
          <PropertySection organizationId={activeOrganization.id} />
        </React.Suspense>
      </section>
    </main>
  );
}

const PropertySection = ({ organizationId }: { organizationId: string }) => {
  const { tenant } = Route.useParams();

  const { data: activeOrganization } = useSuspenseQuery(
    setActiveOrganizationQueryOptions({ organizationSlug: tenant }),
  );

  const { data: properties } = useSuspenseQuery(
    getPropertiesQueryOptions({ organizationId }),
  );

  if (!activeOrganization) return null;

  return (
    <div className="flex items-start gap-2 *:max-w-md *:border *:border-border">
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
                  params={{ tenant: activeOrganization.slug }}
                  to="/app/s/$tenant/property/create"
                >
                  <PlusIcon /> Add Property
                </Link>
              }
            ></Button>
            <Button variant="outline">
              <ImportIcon /> Import Properties
            </Button>
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
            <PropertyCard key={property.id} />
          ))}
          <Button>
            <PlusIcon /> Add Property
          </Button>
        </>
      )}
    </div>
  );
};
