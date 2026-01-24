import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH5 } from "@/components/ui/typography";
import { listOrganizationsQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/_authed/dashboard/admin/organization/")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(listOrganizationsQueryOptions);
  },
});

function RouteComponent() {
  const { data: organizations } = useSuspenseQuery(
    listOrganizationsQueryOptions,
  );

  return (
    <div>
      {organizations?.map((org) => (
        <Link
          key={org.id}
          params={{ organizationId: org.id }}
          to="/dashboard/admin/organization/$organizationId"
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
