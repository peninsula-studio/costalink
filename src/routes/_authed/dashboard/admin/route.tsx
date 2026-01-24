import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionFn } from "@/lib/fn/auth";

export const Route = createFileRoute("/_authed/dashboard/admin")({
  beforeLoad: async () => {
    const session = await getSessionFn();
    if (session?.user.role !== "admin") {
      throw redirect({ to: "/dashboard" });
    }
  },
});
