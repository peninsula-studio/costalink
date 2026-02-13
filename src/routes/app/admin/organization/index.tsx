import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH5 } from "@/components/ui/typography";
import { listOrganizationsQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/admin/organization/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(listOrganizationsQueryOptions());
  },
});

function RouteComponent() {
  const { data: organizations } = useSuspenseQuery(
    listOrganizationsQueryOptions(),
  );

  return (
    <div>
      {organizations?.map((org) => (
        <Link
          key={org.id}
          params={{ id: org.id }}
          to="/app/admin/organization/$id"
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
