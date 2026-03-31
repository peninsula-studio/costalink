import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkSessionFn, getSessionQueryOptions } from "@/lib/fn/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    // const sessionCookie = await checkSessionCookieFn();
    // const session = await context.queryClient.ensureQueryData(
    //   getSessionQueryOptions(),
    // );
    const session = await checkSessionFn();
    if (session) throw redirect({ to: "/" });
  },
});
