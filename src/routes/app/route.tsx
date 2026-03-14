import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSkeleton } from "@/components/app-skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
import { organizationListQueryOptions } from "@/lib/fn/organization";
import { sessionCookieMiddleware } from "@/middleware/auth";
import type { SignInRouteSearch } from "@/routes/_auth/sign-in";

export const Route = createFileRoute("/app")({
  server: {
    middleware: [sessionCookieMiddleware],
  },
  ssr: "data-only",
  beforeLoad: async ({ context, routeId }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    // const sessionCookie = await $checkSessionCookieFn();
    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: {
          callbackUrl: location.pathname as SignInRouteSearch["callbackUrl"],
        },
      });
    }

    return {
      user: session.user,
      breadcrumbs: [{ label: "Dashboard", href: routeId }],
    };
  },
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(
      organizationListQueryOptions({ userId: context.user.id }),
    );
  },
  pendingComponent: () => <AppSkeleton />,
  component: Outlet,
});
