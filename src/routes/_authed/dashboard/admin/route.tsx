import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard/admin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.session.user.role === "admin") {
      return { user: context.session.user };
    } else {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
