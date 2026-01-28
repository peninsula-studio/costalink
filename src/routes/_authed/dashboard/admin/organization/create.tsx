import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateOrganizationForm } from "@/components/create-organization-form";

export const Route = createFileRoute(
  "/_authed/dashboard/admin/organization/create",
)({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.session.user.role === "admin") {
      return { session: context.session };
    } else {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return (
    <main className="flex size-full items-center justify-center">
      <CreateOrganizationForm className="w-full max-w-md" />
    </main>
  );
}
