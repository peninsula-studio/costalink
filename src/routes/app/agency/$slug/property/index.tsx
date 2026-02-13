import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/components/ui/typography";

export const Route = createFileRoute("/app/agency/$slug/property/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { activeOrganization } = Route.useRouteContext();

  return (
    <>
      <TypographyLarge>Hello "/app/agency/$slug/property/"!</TypographyLarge>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link
            params={{ slug: `${activeOrganization.slug}` }}
            to="/app/agency/$slug/property/create"
          >
            Property list
          </Link>
        }
      ></Button>
    </>
  );
}
