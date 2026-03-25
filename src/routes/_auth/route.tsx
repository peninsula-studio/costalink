import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkSessionFn } from "@/lib/fn/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    // const sessionCookie = await checkSessionCookieFn();
    // const session = await context.queryClient.ensureQueryData(
    //   getSessionQueryOptions(),
    // );
    const session = await checkSessionFn();
    if (session) throw redirect({ to: "/" });
  },
});
