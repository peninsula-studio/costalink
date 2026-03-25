import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Building2, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH2,
  TypographyH3,
  TypographyH5,
} from "@/components/ui/typography";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/(app)/(user)/admin/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    if (session.user.role !== "admin") {
      throw redirect({ to: "/" });
    }
  },
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
    <main className="flex flex-col gap-y-8 p-6">
      <TypographyH2>Admin</TypographyH2>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <TypographyH3 className="inline-flex items-center gap-[0.2em]">
            <Building2 className="aspect-square size-[0.8em]" /> Organizations
          </TypographyH3>
          <Button
            className="w-fit"
            nativeButton={false}
            render={
              <Link to="/admin/organization/create">
                <PlusIcon /> Create
              </Link>
            }
          ></Button>
        </div>
        <div className="flex gap-4">
          {organizationList?.map((org) => (
            <Link
              key={org.id}
              params={{ id: org.id }}
              to="/admin/organization/$id"
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
      </div>
    </main>
  );
}
