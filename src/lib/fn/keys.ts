type UserId = { userId: string };

export type OrganizationSelect = {
  organizationSlug?: string;
  organizationId?: string;
};

export type ActiveOrganizationSelect = {
  organizationSlug?: string;
} & {
  organizationId?: string | null;
};

export const userKeys = {
  all: () => ["user"] as const,
  session: () => [...userKeys.all(), "session"] as const,
  list: () => [...userKeys.all(), "list"] as const,
  // signUp: () => ["signUp"] as const,
};

export const organizationKeys = {
  all: () => ["organization"] as const,
  list: () => [...organizationKeys.all(), "list"] as const,
  active: ({ userId }: UserId) =>
    [...organizationKeys.all(), "active", userId] as const,
  fullOrganization: (data: OrganizationSelect = {}) =>
    [
      ...organizationKeys.all(),
      "fullOrganization",
      data.organizationId || data.organizationSlug,
    ] as const,
  setActive: (data: ActiveOrganizationSelect) =>
    [
      ...organizationKeys.all(),
      "setActive",
      // "set",
      data.organizationId,
      data.organizationSlug,
    ] as const,
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
