import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { getSessionQueryOptions } from "@/lib/fn/auth";
// import { adminRequiredMiddleware } from "@/lib/middleware/auth";

export const Route = createFileRoute("/app/(user)/admin")({
  // server: { middleware: [adminRequiredMiddleware] },
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    if (session?.user.role !== "admin") {
      throw redirect({ to: "/app" });
    }
  },
  pendingComponent: DashboardSkeleton,
});
