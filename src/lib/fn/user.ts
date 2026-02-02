import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { userKeys } from "@/lib/fn/keys";
import { authMiddleware } from "@/middleware/auth";
// import { authMiddleware } from "@/middleware/auth";

export const listUsersFn = createServerFn()
  // .middleware([authMiddleware])
  .handler(async () => {
    try {
      const users = await auth.api.listUsers({
        query: { limit: 100 },
        headers: getRequestHeaders(),
      });
      console.info("[ 󰊕]:listUsersFn", "Listing all Users...");
      return users;
    } catch (e) {
      console.error(`Error listing Users: ${(e as Error).message}`);
      throw e;
    }
  });

export const listUsersQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.list(),
    queryFn: listUsersFn,
  });

export const setDefaultOrganizationFn = createServerFn()
  .inputValidator((organizationId: string) => organizationId)
  .middleware([authMiddleware])
  .handler(async ({ data: organizationId, context }) => {
    try {
      const updatedUser = await db
        .update(user)
        .set({ defaultOrganizationId: organizationId })
        .where(eq(user.id, context.session.user.id))
        .returning({ updatedId: user.id });
      console.info("[ 󰊕]:listUsersFn", "Listing all Users...");
      return updatedUser;
    } catch (e) {
      console.error(`Error listing Users: ${(e as Error).message}`);
      throw e;
    }
  });
