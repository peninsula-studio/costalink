import { db } from "@/lib/db";

export async function getInitialOrganization(userId: string) {
  const user = await db.query.user.findFirst({ where: { id: { eq: userId } } });
  if (user) {
    return user.defaultOrganizationId;
  } else {
    return null;
  }
}
