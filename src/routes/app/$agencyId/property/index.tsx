import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/components/ui/typography";

export const Route = createFileRoute("/app/$agencyId/property/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { activeOrganization } = Route.useRouteContext();

  return (
    <>
      <TypographyLarge>Hello "/app/agency/$id/property/"!</TypographyLarge>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link
            params={{ id: `${activeOrganization.id}` }}
            to="/app/agency/$id/property/create"
          >
            Property list
          </Link>
        }
      ></Button>
    </>
  );
}
