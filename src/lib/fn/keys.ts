export const userKeys = {
  all: () => ["user"] as const,
  session: () => [...userKeys.all(), "session"] as const,
  list: () => [...userKeys.all(), "list"] as const,
  // signUp: () => ["signUp"] as const,
};

export type ActiveOrganizationSelect = {
  organizationSlug?: string;
  organizationId?: string | null;
};

export type OrganizationSelect = {
  organizationSlug?: string;
  organizationId?: string;
};

export const organizationKeys = {
  all: () => ["organization"] as const,
  list: () => [...organizationKeys.all(), "list"] as const,
  active: () => [...organizationKeys.all(), "active"] as const,
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
      data.organizationId,
      data.organizationSlug,
    ] as const,
};

export const memberKeys = {
  all: () => ["member"] as const,
  active: () => [...memberKeys.all(), "active"] as const,
  list: (data: OrganizationSelect) =>
    [
      ...memberKeys.all(),
      "list",
      data.organizationId || data.organizationSlug,
    ] as const,
  // signUp: (email: string) => ["signUp", email] as const,
  // signUp: () => ["signUp"] as const,
};
