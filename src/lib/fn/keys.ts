import type { z } from "zod";
import type { organizationSelectSchema } from "../zod/schemas/organization";
import type { getFullOrganizationFn } from "./organization";
import type { getOrganizationProperyListFn } from "./property";

type UserId = { userId: string };

export const userKeys = {
  all: () => ["user"] as const,
  session: () => [...userKeys.all(), "session"] as const,
  list: () => [...userKeys.all(), "list"] as const,
  // signUp: () => ["signUp"] as const,
};

export const organizationKeys = {
  all: () => ["organization"] as const,
  list: ({ userId }: UserId) =>
    [...organizationKeys.all(), "list", userId] as const,
  active: ({ userId }: UserId) =>
    [...organizationKeys.all(), "active", userId] as const,
  fullOrganization: ({ data }: Parameters<typeof getFullOrganizationFn>[0]) =>
    [
      ...organizationKeys.all(),
      "full",
      data?.organizationId || data?.organizationSlug,
    ] as const,
  setActive: (data: UserId & z.infer<typeof organizationSelectSchema>) =>
    // setActive: (data: UserId & ActiveOrganizationSelect) =>
    [
      ...organizationKeys.all(),
      "setActive",
      data.userId,
      data.organizationId || data.organizationSlug,
    ] as const,
};

export const propertyKeys = {
  all: () => ["property"] as const,
  list: (data: Parameters<typeof getOrganizationProperyListFn>[0]["data"]) =>
    [
      ...propertyKeys.all(),
      "list",
      data.organizationId,
      data.pageSize,
      data.page,
    ] as const,
  create: () => [...propertyKeys.all(), "create"] as const,
  detail: (id: string) => [...propertyKeys.all(), "detail", id] as const,
  update: () => [...propertyKeys.all(), "update"] as const,
  delete: () => [...propertyKeys.all(), "delete"] as const,
};

export const memberKeys = {
  all: () => ["member"] as const,
  active: ({
    userId,
    organizationId,
  }: {
    userId: string;
    organizationId: string;
  }) => [...memberKeys.all(), "active", userId, organizationId] as const,
  list: (data: z.infer<typeof organizationSelectSchema>) =>
    [
      ...memberKeys.all(),
      "list",
      data.organizationId || data.organizationSlug,
    ] as const,
  // signUp: (email: string) => ["signUp", email] as const,
  // signUp: () => ["signUp"] as const,
};
