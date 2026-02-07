import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateOrganizationForm } from "@/components/create-organization-form";

export const Route = createFileRoute("/app/admin/organization/create")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user.role !== "admin") {
      throw redirect({ to: "/app" });
    }
    const user = { ...context.user, role: "admin" as const };
    return { user };
  },
});

function RouteComponent() {
  return (
    <main className="flex size-full items-center justify-center">
      <CreateOrganizationForm className="w-full max-w-md" />
    </main>
  );
}
