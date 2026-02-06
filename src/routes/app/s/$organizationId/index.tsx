import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import {
  ArrowUpRightIcon,
  FolderCode,
  HouseIcon,
  ImportIcon,
  PlusIcon,
} from "lucide-react";
import { Suspense } from "react";
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
import {
  TypographyH2,
  TypographyH3,
  TypographyLarge,
} from "@/components/ui/typography";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import { getActiveOrganizationQueryOptions } from "@/lib/fn/organization";
import { getPropertiesQueryOptions } from "@/lib/fn/property";

export const Route = createFileRoute("/app/s/$organizationId/")({
  loader: async ({ context }) => {
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    if (!activeOrganization) throw redirect({ to: "/app" });
    context.queryClient.ensureQueryData(
      getActiveMemberQueryOptions({
        userId: context.user.id,
        organizationId: activeOrganization.id,
      }),
    );
    return { activeOrganization };
  },
  component: OrganizationPage,
});

function OrganizationPage() {
  const { activeOrganization } = Route.useLoaderData();

  return (
    <>
      <TypographyH2>{activeOrganization.name}</TypographyH2>
      <TypographyLarge>{activeOrganization.id}</TypographyLarge>

      <section className="flex flex-col gap-y-6">
        <TypographyH3 className="inline-flex">
          <HouseIcon className="inline-flex" /> Properties
        </TypographyH3>
        <Suspense fallback={<div>Loading...</div>}>
          <PropertySection organizationId={activeOrganization.id} />
        </Suspense>
      </section>
    </>
  );
}

const PropertySection = ({ organizationId }: { organizationId: string }) => {
  const { activeOrganization } = Route.useLoaderData();

  const { data: properties } = useSuspenseQuery(
    getPropertiesQueryOptions({ organizationId }),
  );

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
                  params={{ organizationId: activeOrganization.id }}
                  to="/app/s/$organizationId/property/create"
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
