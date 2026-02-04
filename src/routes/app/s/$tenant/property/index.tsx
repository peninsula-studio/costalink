import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/components/ui/typography";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/s/$tenant/property/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tenant } = Route.useParams();
  const { data: activeOrganization } = useSuspenseQuery(
    setActiveOrganizationQueryOptions({ organizationSlug: tenant }),
  );

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <TypographyLarge>Hello "/app/s/$tenant/property/"!</TypographyLarge>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link
            params={{ tenant: `${activeOrganization?.slug}` }}
            to="/app/s/$tenant/property/create"
          >
            Property list
          </Link>
        }
      ></Button>
    </main>
  );
}
