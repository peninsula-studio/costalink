import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH2,
  TypographyH3,
  TypographyH5,
} from "@/components/ui/typography";
import { listOrganizationsQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/admin/")({
  component: RouteComponent,
  // beforeLoad: async ({ context }) => {
  //   if (context.user.role !== "admin") {
  //     throw redirect({ to: "/dashboard" });
  //   }
  // },
});

function RouteComponent() {
  const { data: organizations } = useSuspenseQuery(
    listOrganizationsQueryOptions(),
  );

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
            render={
              <Link to="/app/admin/organization/create">
                <PlusIcon /> Create
              </Link>
            }
          ></Button>
        </div>
        <div className="flex gap-4">
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
      </div>
    </main>
  );
}
