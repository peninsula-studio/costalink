import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import { FlexContainer } from "@/components/container";
import { Button } from "@/components/ui/button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";

export const Route = createFileRoute("/app/")({
  loader: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    const organizationList = await context.queryClient.ensureQueryData(
      organizationListQueryOptions({ userId: context.user.id }),
    );
    return { session, organizationList };
  },
  pendingComponent: () => (
    <div className="flex size-full min-h-lvh p-6">
      <Skeleton className="h-10 w-full" />
    </div>
  ),
  component: AppIndexPage,
});

function AppIndexPage() {
  const { user } = Route.useRouteContext();
  const { organizationList } = Route.useLoaderData();

  return (
    <FlexContainer>
      <TypographyH2>Dashboard</TypographyH2>
      {user.role === "admin" && (
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
        {organizationList?.map((o, i) => (
          <Button
            className="flex w-fit items-center"
            key={o.name}
            nativeButton={false}
            render={
              <Link
                params={{ agencyId: o.id }}
                preload={false}
                to="/app/$agencyId"
              ></Link>
            }
          >
            <Building2 className="stroke-white/80" />
            {o.name}
            <DropdownMenuShortcut className="text-white/70">
              ⌘{i + 1}
            </DropdownMenuShortcut>
          </Button>
        ))}
      </div>
    </FlexContainer>
  );
}
