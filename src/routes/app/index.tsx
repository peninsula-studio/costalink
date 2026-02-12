import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
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
  loader: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    const organizations = await context.queryClient.ensureQueryData(
      listOrganizationsQueryOptions(),
    );
    return { session, organizations };
  },
  pendingComponent: () => (
    <div className="flex size-full min-h-lvh p-6">
      <Skeleton className="h-10 w-full" />
    </div>
  ),
  component: AppIndexPage,
});

function AppIndexPage() {
  const { organizations } = Route.useLoaderData();
  const { user } = Route.useRouteContext();

  const { data: activeOrganization } = useSuspenseQuery(
    getActiveOrganizationQueryOptions({ userId: user.id }),
  );
  const router = useRouter();

  if (activeOrganization) {
    router.buildAndCommitLocation({
      to: "/app/agency/$id",
      params: { id: activeOrganization.id },
    });
  }

  return (
    <main className="flex flex-col gap-y-6 p-6">
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
        {organizations?.map((o, i) => (
          <Button
            className="flex w-fit items-center"
            key={o.name}
            nativeButton={false}
            render={
              <Link
                params={{ id: o.id }}
                preload={false}
                to="/app/agency/$id"
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
    </main>
  );
}
