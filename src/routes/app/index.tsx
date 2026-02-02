import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { TypographyH2 } from "@/components/ui/typography";
import {
  getActiveOrganizationQueryOptions,
  listOrganizationsQueryOptions,
} from "@/lib/fn/organization";

export const Route = createFileRoute("/app/")({
  component: AppIndexPage,
  beforeLoad: async ({ context }) => {
    const organizations = await context.queryClient.ensureQueryData(
      listOrganizationsQueryOptions,
    );
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions,
    );

    return { organizations, activeOrganization };
  },
});

function AppIndexPage() {
  const { session, organizations, activeOrganization } =
    Route.useRouteContext();

  return (
    <div className="flex flex-col gap-y-6">
      <TypographyH2>Dashboard</TypographyH2>
      {!activeOrganization && <div>No Org!!</div>}
      {session.user.role === "admin" && (
        <div>
          <Button nativeButton={false} render={<Link to="/app/admin"></Link>}>
            Admin panel
          </Button>
        </div>
      )}
      <div className="flex gap-2">
        <Button
          onClick={() => toast.success("Success toast")}
          variant="default"
        >
          Toast success
        </Button>
        <Button
          onClick={() => toast.error("Error toast")}
          variant="destructive"
        >
          Toast error
        </Button>
      </div>
      <div className="flex flex-col gap-4 py-10">
        {organizations?.map((o, index) => (
          <Button
            className="flex w-fit items-center"
            key={o.name}
            nativeButton={false}
            render={
              <Link
                params={{ tenant: o.slug }}
                preload={false}
                to="/app/s/$tenant"
              ></Link>
            }
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
