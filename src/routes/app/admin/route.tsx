import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionQueryOptions } from "@/lib/fn/auth";

export const Route = createFileRoute("/app/admin")({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    if (session?.user.role !== "admin") {
      throw redirect({ to: "/app" });
    }
  },
});
