import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getSessionCookie } from "better-auth/cookies";
import { getSessionFn } from "@/lib/fn/auth";

export const sessionCookieMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    console.log(
      `Getting session cookie from middleware... ${(new Date()).toLocaleTimeString()}`,
    );
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      throw redirect({ to: "/sign-in" });
    }
    return await next();
  },
);

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const session = await getSessionFn();
    if (!session) {
      throw redirect({ to: "/sign-in" });
    }
    return await next({ context: { session } });
  },
);

export const adminMiddleware = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    console.log("Checking if user is Admin...");
    if (context.session.user.role !== "admin") {
      throw redirect({ to: "/app" });
    }
    return await next({ context });
  });
