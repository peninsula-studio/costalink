import { Separator } from "@base-ui/react";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { AppProvider } from "@/components/app-provider";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { $checkSessionCookieFn, getSessionQueryOptions } from "@/lib/fn/auth";
import { getActiveOrganizationQueryOptions } from "@/lib/fn/organization";
import { sessionCookieMiddleware } from "@/middleware/auth";
import type { SignInRouteSearch } from "@/routes/_auth/sign-in";

// const searchSchema = z.object({
//   agency: z.string().optional(),
// });

export const Route = createFileRoute("/app")({
  server: {
    middleware: [sessionCookieMiddleware],
  },
  // validateSearch: zodValidator(searchSchema),
  // search: {
  //   middlewares: [retainSearchParams(["agency"])],
  // },
  beforeLoad: async ({ context, location, search }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    const sessionCookie = await $checkSessionCookieFn();
    if (!sessionCookie || !session) {
      throw redirect({
        to: "/sign-in",
        search: {
          callbackUrl: location.pathname as SignInRouteSearch["callbackUrl"],
        },
      });
    }
    return { user: session.user };
  },
  loader: async ({ context }) => {
    const activeOrganization = await context.queryClient.ensureQueryData(
      getActiveOrganizationQueryOptions({ userId: context.user.id }),
    );
    return { activeOrganization };
  },
  pendingComponent: () => (
    <>
      <Sidebar>
        <SidebarHeader>
          <Skeleton className="h-12 w-full" />
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 px-4 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <Skeleton className="h-6 w-full" />
        </header>
        <div>/app ROUTE SUSPENSE</div>
      </SidebarInset>
    </>
  ),
  component: AppLayout,
});

function AppLayout() {
  const { activeOrganization } = Route.useLoaderData();

  const navigate = useNavigate();

  // const { data: session } = useSuspenseQuery(getSessionQueryOptions());

  if (activeOrganization) {
    navigate({
      to: "/app/agency/$id",
      params: { id: activeOrganization.id },
    });
  }

  return (
    <>
      <Outlet />
    </>
  );
}
