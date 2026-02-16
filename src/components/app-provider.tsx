import React, { createContext, type ReactNode } from "react";
import type { auth } from "@/lib/auth";


type AppCtxProps = {
  activeOrgId: string;
};

const AppCtx = createContext({} as AppCtxProps);

export function AppProvider({
  activeOrgId,
  children,
}: {
  activeOrgId: string;
  children: Readonly<ReactNode>;
}) {
  // const [activeOrganization, setActiveOrganization] =
  //   useState<ActiveOrganization>(initialOrg);
  // const [user, setUser] = useState<User>(initialUser);

  return (
    <AppCtx value={{ activeOrgId }}>
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
