import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { userKeys } from "@/lib/fn/keys";
import { sessionCookieMiddleware } from "@/lib/middleware/auth";
// import { authMiddleware } from "@/lib/middleware/auth";

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
  .inputValidator((data: { organizationId: string; userId: string }) => data)
  .middleware([sessionCookieMiddleware])
  .handler(async ({ data: { organizationId, userId } }) => {
    try {
      const updatedUser = await db
        .update(user)
        .set({ defaultOrganizationId: organizationId })
        .where(eq(user.id, userId))
        .returning({ user });
      console.info(
        `✅ Set default organization for ${updatedUser[0].user.name}}`,
      );
      return updatedUser;
    } catch (e) {
      console.error(
        `❌ Error setting default Organization: ${(e as Error).message}`,
      );
      throw e;
    }
  });
