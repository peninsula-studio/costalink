import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { getActiveMemberQueryOptions } from "@/lib/fn/member";
import { setActiveOrganizationQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/s/$tenant/property/create")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    context.queryClient.ensureQueryData(getActiveMemberQueryOptions());
  },
});

function RouteComponent() {
  const { tenant } = Route.useParams();
  const { data: activeOrganization } = useSuspenseQuery(
    setActiveOrganizationQueryOptions({ organizationSlug: tenant }),
  );
  const { data: member } = useSuspenseQuery(getActiveMemberQueryOptions());

  return (
    <main className="flex size-full flex-col p-6">
      <TypographyH2>
        Role: <i>{member.role}</i>
      </TypographyH2>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link
            params={{ tenant: `${activeOrganization?.slug}` }}
            to="/app/s/$tenant/property"
          >
            Property list
          </Link>
        }
      ></Button>
    </main>
  );
}
