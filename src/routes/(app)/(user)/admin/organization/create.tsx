import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateOrganizationForm } from "@/components/create-organization-form";
import { getSessionQueryOptions } from "@/lib/fn/auth";

export const Route = createFileRoute("/(app)/(user)/admin/organization/create")(
  {
    component: RouteComponent,
    beforeLoad: async ({ context }) => {
      const session = await context.queryClient.ensureQueryData(
        getSessionQueryOptions(),
      );
      if (session.user.role !== "admin") {
        throw redirect({ to: "/" });
      }
    },
  },
);

function RouteComponent() {
  return (
    <main className="flex size-full items-center justify-center">
      <CreateOrganizationForm className="w-full max-w-md" />
    </main>
  );
}
