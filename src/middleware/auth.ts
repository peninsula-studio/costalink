import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getSessionFn } from "@/lib/fn/auth";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  console.log("Getting session from middleware...");
  const session = await getSessionFn();
  if (!session?.user) {
    throw redirect({ to: "/sign-in" });
  }
  return await next({ context: { user: session.user } });
});
