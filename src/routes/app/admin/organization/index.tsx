import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH5 } from "@/components/ui/typography";

export const Route = createFileRoute("/app/admin/organization/")({
  component: RouteComponent,
  // loader: async ({ context }) => {
  //   context.queryClient.ensureQueryData(
  //     organizationListQueryOptions({ userId: context.user.id }),
  //   );
  // },
});

function RouteComponent() {
  const { organizationList } = Route.useRouteContext();

  return (
    <div>
      {organizationList?.map((org) => (
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
