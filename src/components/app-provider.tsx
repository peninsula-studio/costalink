"use client";

import React, { createContext, type ReactNode } from "react";
import type { auth } from "@/lib/auth";

export type ActiveOrganization = typeof auth.$Infer.ActiveOrganization;
export type User = typeof auth.$Infer.Session.user;

type AppCtxProps = {
  // activeOrganization: ActiveOrganization;
  // setActiveOrganization: Dispatch<SetStateAction<ActiveOrganization>>;
  user: User;
  // activeAgencyId: string;
  // setUser: Dispatch<SetStateAction<User>>;
};

const AppCtx = createContext({} as AppCtxProps);

export function AppProvider({
  // activeOrganization,
  user,
  // activeAgencyId,
  children,
}: {
  // activeOrganization: ActiveOrganization;
  user: User;
  // activeAgencyId: string;
  children: Readonly<ReactNode>;
}) {
  // const [activeOrganization, setActiveOrganization] =
  //   useState<ActiveOrganization>(initialOrg);
  // const [user, setUser] = useState<User>(initialUser);

  return <AppCtx value={{ user }}>{children}</AppCtx>;
}

export function useAppCtx() {
  const val = React.use(AppCtx);
  if (!val)
    throw new Error("useActiveOrganization called outside of ThemeProvider!");
  return val;
}
