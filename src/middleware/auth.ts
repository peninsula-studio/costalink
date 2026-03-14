import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getSessionCookie } from "better-auth/cookies";
import { db } from "@/lib/db";
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

export const adminRequiredMiddleware = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    console.log("Checking if user is Admin...");
    if (context.session.user.role !== "admin") {
      throw redirect({ to: "/app" });
    }
    return await next({ context });
  });

export const hasActiveOrganizationMiddleware = createMiddleware({
  type: "function",
})
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    console.log("Checking if user has active Organization...");
    if (!context.session.session.activeOrganizationId) {
      throw redirect({ to: "/app" });
    }
    return await next({ context });
  });

/**
 * Verifies the authenticated user is a member of the organization identified
 * by `organizationId` in the server function's input data.
 *
 * Must be used after `authMiddleware`. The server function's input must
 * include an `organizationId: string` field.
 */
// export const orgMembershipMiddleware = createMiddleware({ type: "function" })
//   .middleware([authMiddleware])
//   .inputValidator((d: { propertyId: string; userId: string }) => d)
//   .server(async ({ next, context, data }) => {
//     const { propertyId, userId } = data;
//
//     if (!member) {
//       console.warn(
//         `User ${userId} attempted to access organization ${organizationId} without membership.`,
//       );
//       throw redirect({ to: "/app" });
//     }
//
//     return await next({ context });
//   });
