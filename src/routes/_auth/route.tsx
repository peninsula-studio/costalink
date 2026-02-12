import { createFileRoute, redirect } from "@tanstack/react-router";
import { $checkSessionCookieFn, getSessionQueryOptions } from "@/lib/fn/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    const sessionCookie = await $checkSessionCookieFn();
    const session = await context.queryClient.ensureQueryData(
      getSessionQueryOptions(),
    );
    if (session || sessionCookie) throw redirect({ to: "/app" });
  },
});
