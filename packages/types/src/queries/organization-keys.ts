import type { z } from "zod";
import type { organizationSelectSchema } from "@/schemas/organization";
import type { userSelectSchema } from "@/schemas/user";

export const organizationKeys = {
  all: () => ["organization"] as const,
  // list: ({ userId }: z.infer<typeof userSelectSchema>) =>
  //   [...organizationKeys.all(), "list", userId] as const,
  list: () => [...organizationKeys.all(), "list"] as const,
  // active: ({ userId }: z.infer<typeof userSelectSchema>) =>
  //   [...organizationKeys.all(), "active", userId] as const,
  active: () => [...organizationKeys.all(), "active"] as const,
  fullOrganization: ({
    organizationId,
    organizationSlug,
  }: z.infer<typeof organizationSelectSchema>) =>
    [
      ...organizationKeys.all(),
      "full",
      organizationId || organizationSlug,
    ] as const,
  setActive: ({
    userId,
    organizationId,
    organizationSlug,
  }: z.infer<typeof userSelectSchema> &
    z.infer<typeof organizationSelectSchema>) =>
    // setActive: (data: UserId & ActiveOrganizationSelect) =>
    [
      ...organizationKeys.all(),
      "setActive",
      userId,
      organizationId || organizationSlug,
    ] as const,
};
