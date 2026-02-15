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
  all: () => String(["user"]),
  session: () => String([...userKeys.all(), "session"]),
  list: () => String([...userKeys.all(), "list"]),
  // signUp: () => ["signUp"] as const,
};

export const organizationKeys = {
  all: () => String(["organization"]),
  list: () => String([...organizationKeys.all(), "list"]),
  active: () => String([...organizationKeys.all(), "active"]),
  fullOrganization: (data: OrganizationSelect = {}) =>
    String([
      ...organizationKeys.all(),
      "fullOrganization",
      String(data.organizationId || data.organizationSlug),
    ]),
  setActive: (data: UserId) =>
    // setActive: (data: UserId & ActiveOrganizationSelect) =>
    String([
      ...organizationKeys.all(),
      "setActive",
      data.userId,
      // data.organizationId || data.organizationSlug,
    ]),
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
