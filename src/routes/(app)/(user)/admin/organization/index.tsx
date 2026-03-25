import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH5 } from "@/components/ui/typography";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/(app)/(user)/admin/organization/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );

    const organizationList = await context.queryClient.ensureQueryData(
      organizationListQueryOptions({ userId: session.user.id }),
    );

    return { organizationList };
  },
});

function RouteComponent() {
  const { organizationList } = Route.useLoaderData();

  return (
    <div>
      {organizationList?.map((org) => (
        <Link key={org.id} params={{ id: org.id }} to="/admin/organization/$id">
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
