import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionQueryOptions } from "@/lib/fn/auth";

export const Route = createFileRoute("/_authed/dashboard/admin")({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.fetchQuery(
      getSessionQueryOptions(),
    );
    if (session?.user.role !== "admin") {
      throw redirect({ to: "/dashboard" });
    }
  },
});
