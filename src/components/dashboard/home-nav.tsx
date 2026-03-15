import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams, useRouteContext } from "@tanstack/react-router";
import { Building2, UserIcon } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { organizationListQueryOptions } from "@/lib/fn/organization";

export function HomeNav() {
  const { user } = useRouteContext({
    from: "/app",
  });

  const params = useParams({
    from: "/app/$organizationId",
    shouldThrow: false,
  });

  const { data: organizationList } = useSuspenseQuery(
    organizationListQueryOptions({ userId: user.id }),
  );

  const activeOrganization = organizationList.find(
    (o) => o.id === params?.organizationId,
  );

  return (
    <SidebarMenuButton
      render={
        activeOrganization ? (
          <Link
            params={{ organizationId: activeOrganization?.id }}
            to="/app/$organizationId"
          />
        ) : (
          <Link to="/app" />
        )
      }
      size="lg"
      variant="primary"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary-foreground text-sidebar-primary">
        {params?.organizationId && activeOrganization ? (
          <Building2 className="size-4" />
        ) : (
          <UserIcon className="size-4" />
        )}
      </div>
      <span className="truncate font-medium">
        {(params?.organizationId && activeOrganization?.name) || user.name}
      </span>
    </SidebarMenuButton>
  );
}
