import type { XOR } from "@/types/util";

type UserId = { userId: string };

export type OrganizationSelect = {
  organizationSlug?: string;
  organizationId?: string;
};

export type ActiveOrganizationSelect = XOR<
  {
    organizationSlug: string;
  },
  {
    organizationId: string | null;
  }
>;

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
  fullOrganization: (data: OrganizationSelect = {}) =>
    [
      ...organizationKeys.all(),
      "full",
      data.organizationId || data.organizationSlug,
    ] as const,
  setActive: (data: UserId & ActiveOrganizationSelect) =>
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
  list: ({ organizationId }: { organizationId: string }) =>
    [...propertyKeys.all(), "list", organizationId] as const,
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
  list: (data: OrganizationSelect) =>
    [
      ...memberKeys.all(),
      "list",
      data.organizationId || data.organizationSlug,
    ] as const,
  // signUp: (email: string) => ["signUp", email] as const,
  // signUp: () => ["signUp"] as const,
};
