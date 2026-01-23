import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { TypographyH2 } from "@/components/ui/typography";
import {
  setActiveOrganizationQueryOptions,
  listOrganizationsQueryOptions,
} from "@/lib/fn/organization";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { session } = Route.useRouteContext();

  const { data: organizations } = useSuspenseQuery(
    listOrganizationsQueryOptions(session.user.id),
  );

  const { data: activeOrganization } = useSuspenseQuery(
    setActiveOrganizationQueryOptions({ organizationId: null }),
  );

  return (
    <div className="flex flex-col gap-y-6">
      <TypographyH2>Dashboard</TypographyH2>
      {!activeOrganization && <div>No Org!!</div>}
      {session.user.role === "admin" && (
        <section>
          <Button
            nativeButton={false}
            render={<Link to="/dashboard/admin"></Link>}
          >
            Admin panel
          </Button>
        </section>
      )}
      <div className="flex flex-col gap-4 py-10">
        {organizations?.map((o, index) => (
          <Button
            className="flex w-fit items-center"
            key={o.name}
            nativeButton={false}
            render={<Link params={{ tenant: o.slug }} to="/s/$tenant"></Link>}
          >
            <Building2 className="stroke-white/80" />
            {o.name}
            <DropdownMenuShortcut className="text-white/70">
              ⌘{index + 1}
            </DropdownMenuShortcut>
          </Button>
        ))}
      </div>
    </div>
  );
}
