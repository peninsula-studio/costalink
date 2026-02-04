import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import {
  getActiveOrganizationQueryOptions,
  listOrganizationsQueryOptions,
} from "@/lib/fn/organization";

export const Route = createFileRoute("/app/")({
  beforeLoad: ({ context }) => {
    context.queryClient.ensureQueryData(listOrganizationsQueryOptions());
    context.queryClient.ensureQueryData(getActiveOrganizationQueryOptions);
  },
  pendingComponent: () => (
    <div className="flex size-full min-h-lvh p-6">
      <Skeleton className="h-10 w-full" />
    </div>
  ),
  component: AppIndexPage,
});

function AppIndexPage() {
  const { data: session } = useSuspenseQuery(getSessionQueryOptions());

  const { data: activeOrganization } = useSuspenseQuery(
    getActiveOrganizationQueryOptions,
  );
  const { data: organizations } = useSuspenseQuery(
    listOrganizationsQueryOptions(),
  );

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <TypographyH2>Dashboard</TypographyH2>
      {!activeOrganization && <div>No Org!!</div>}
      {session?.user.role === "admin" && (
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
    </main>
  );
}
