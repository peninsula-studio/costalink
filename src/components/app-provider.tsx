"use client";

import React, { createContext, type ReactNode } from "react";
import type { auth } from "@/lib/auth";

export type ActiveOrganization = typeof auth.$Infer.ActiveOrganization;
export type OrganizationList = (typeof auth.$Infer.Organization)[];
export type User = typeof auth.$Infer.Session.user;

type AppCtxProps = {
  activeOrgPromise: Promise<ActiveOrganization | null>;
  orgListPromise: Promise<OrganizationList>;
  // setActiveOrganization: Dispatch<SetStateAction<ActiveOrganization>>;
  user: User;
  // activeAgencyId: string;
  // setUser: Dispatch<SetStateAction<User>>;
};

const AppCtx = createContext({} as AppCtxProps);

export function AppProvider({
  activeOrgPromise,
  user,
  orgListPromise,
  // activeAgencyId,
  children,
}: {
  activeOrgPromise: Promise<ActiveOrganization | null>;
  orgListPromise: Promise<OrganizationList>;
  user: User;
  // activeAgencyId: string;
  children: Readonly<ReactNode>;
}) {
  // const [activeOrganization, setActiveOrganization] =
  //   useState<ActiveOrganization>(initialOrg);
  // const [user, setUser] = useState<User>(initialUser);

  return (
    <AppCtx value={{ user, activeOrgPromise, orgListPromise }}>
      {children}
    </AppCtx>
  );
}

export function useAppCtx() {
  const val = React.use(AppCtx);
  if (!val)
    throw new Error("useActiveOrganization called outside of ThemeProvider!");
  return val;
}
