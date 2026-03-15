import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionQueryOptions } from "@/lib/fn/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    // const sessionCookie = await checkSessionCookieFn();
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    if (session) throw redirect({ to: "/app" });
  },
});
