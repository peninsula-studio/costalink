import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { userKeys } from "@/lib/fn/keys";
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
