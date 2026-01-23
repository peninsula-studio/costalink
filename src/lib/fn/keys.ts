export const userKeys = {
  all: () => ["user"] as const,
  session: () => [...userKeys.all(), "session"] as const,
};

export type ActiveOrganizationSelect = {
  organizationSlug?: string;
  organizationId?: string | null;
};

export type FullOrganizationSelect = {
  organizationSlug?: string;
  organizationId?: string;
};

export const organizationKeys = {
  listOrganizations: (userId: string) => ["listOrganizations", userId] as const,
  getActiveOrganization: (userId: string) =>
    ["getActiveOrganization", userId] as const,
  getFullOrganization: ({
    organizationSlug,
    organizationId,
  }: FullOrganizationSelect) =>
    ["fullOrganization", organizationId, organizationSlug] as const,
  setActiveOrganization: ({
    organizationSlug,
    organizationId,
  }: ActiveOrganizationSelect) =>
    ["activeOrganization", organizationId, organizationSlug] as const,
};
