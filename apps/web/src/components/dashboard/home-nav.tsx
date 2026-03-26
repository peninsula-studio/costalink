import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { Building2, UserIcon } from "lucide-react";
import { SidebarMenuButton } from "@repo/ui/components/sidebar";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";

export function HomeNav() {
  const { data: session } = useSuspenseQuery(getSessionQueryOptions());

  const params = useParams({
    from: "/(app)/$organizationId",
    shouldThrow: false,
  });

  const { data: organizationList } = useSuspenseQuery(
    organizationListQueryOptions({ userId: session.user.id }),
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
            to="/$organizationId"
          />
        ) : (
          <Link to="/" />
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
        {(params?.organizationId && activeOrganization?.name) ||
          session.user.name}
      </span>
    </SidebarMenuButton>
  );
}
