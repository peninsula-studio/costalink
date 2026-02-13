import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
// import { authMiddleware } from "@/middleware/auth";

// export const listUsersFn = createServerFn()
//   // .middleware([authMiddleware])
//   .handler(async () => {
//     try {
//       const users = await auth.api.listUsers({
//         query: { limit: 100 },
//         headers: getRequestHeaders(),
//       });
//       console.info("[ 󰊕]:listUsersFn", "Listing all Users...");
//       return users;
//     } catch (e) {
//       console.error(`Error listing Users: ${(e as Error).message}`);
//       throw e;
//     }
//   });
//
// export const listUsersQueryOptions = () =>
//   queryOptions({
//     queryKey: userKeys.list(),
//     queryFn: listUsersFn,
//   });

export async function $setDefaultOrganization({
  organizationId,
  userId,
}: {
  organizationId: string;
  userId: string;
}) {
  try {
    const updatedUser = await db
      .update(user)
      .set({ defaultOrganizationId: organizationId })
      .where(eq(user.id, userId))
      .returning({ updatedId: user.id });
    console.info("[ 󰊕]:listUsersFn", "Listing all Users...");
    return updatedUser;
  } catch (e) {
    console.error(`Error listing Users: ${(e as Error).message}`);
    throw e;
  }
}
