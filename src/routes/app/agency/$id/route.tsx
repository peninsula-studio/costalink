import { Separator } from "@base-ui/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getActiveOrganizationQueryOptions,
  setActiveOrganizationQueryOptions,
} from "@/lib/fn/organization";

export const Route = createFileRoute("/app/agency/$id")({
  beforeLoad: async ({ context, params }) => {
    let activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    if (activeOrganization?.id !== params.id) {
      activeOrganization = await context.queryClient.fetchQuery(
        setActiveOrganizationQueryOptions({
          userId: context.user.id,
          organizationId: params.id,
        }),
      );
      context.queryClient.resetQueries(
        getActiveOrganizationQueryOptions({ userId: context.user.id }),
      );
    }
    // if (!activeOrganization) throw redirect({ to: "/app" });
    return { activeOrganization };
  },
  loader: async ({ context }) => {
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    // if (!activeOrganization) throw redirect({ to: "/app" });
    return { activeOrganization };
  },
  pendingComponent: () => (
    <div className="flex flex-col gap-y-6 p-6">
      LOADING $ID ROUTE...
      <Skeleton className="h-12 w-md" />
      <div className="flex w-full gap-x-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  ),
  component: OrganizationLayout,
});

function OrganizationLayout() {
  // const { activeOrganization } = Route.useLoaderData();
  // const { setActiveOrganization } = useAppCtx();
  // useLayoutEffect(() => {
  //   setActiveOrganization(activeOrganization);
  // }, [activeOrganization, setActiveOrganization]);

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-col gap-y-6 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </>
  );
}
