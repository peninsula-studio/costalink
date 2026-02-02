import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH5 } from "@/components/ui/typography";
import { listOrganizationsQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/admin/organization/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const organizations = await context.queryClient.ensureQueryData(
      listOrganizationsQueryOptions,
    );
    return { organizations };
  },
});

function RouteComponent() {
  const { organizations } = Route.useLoaderData();

  return (
    <div>
      {organizations?.map((org) => (
        <Link
          key={org.id}
          params={{ organizationId: org.id }}
          to="/app/admin/organization/$organizationId"
        >
          <Card>
            <CardHeader>
              <TypographyH5>{org.name}</TypographyH5>
            </CardHeader>
            <CardContent>
              <div>Slug: {org.slug}</div>
              <div className="text-xs">ID: {org.id}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
