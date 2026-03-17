import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { getSessionCookie } from "better-auth/cookies";
import { z } from "zod";
import { auth } from "@/lib/auth";

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

export const authMiddleware = createMiddleware().server(
  async ({ next, pathname }) => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });
    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: {
          callbackUrl: pathname,
        },
      });
    }
    return await next({ context: { session } });
  },
);

export const adminRequiredMiddleware = createMiddleware()
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

export const memberRequiredMiddleware = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ organizationId: z.string() }))
  .server(async ({ data, next, context }) => {
    const orgs = await auth.api.listOrganizations({
      headers: getRequestHeaders(),
    });
    console.log("Checking if member is admin or higher...");
    if (!orgs.find((o) => o.id === data.organizationId)) {
      throw new Error(
        `You aren't a member of organizationId ${data.organizationId}`,
      );
    }
    return await next({ context });
  });

export const adminMemberMiddleware = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    const memberRole = await auth.api.getActiveMemberRole({
      headers: getRequestHeaders(),
    });
    console.log("Checking if member is admin or higher...");
    if (memberRole.role !== "admin" && memberRole.role !== "owner") {
      throw new Error("You don't have enough privileges for this action");
    }
    return await next({ context });
  });

export const ownerMemberMiddleware = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    const memberRole = await auth.api.getActiveMemberRole({
      headers: getRequestHeaders(),
    });
    console.log("Checking if member is admin or higher...");
    if (memberRole.role !== "owner") {
      throw new Error("You don't have enough privileges for this action");
    }
    return await next({ context });
  });
