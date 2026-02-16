import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";
import type { auth } from "@/lib/auth";

type ActiveOrganization = typeof auth.$Infer.ActiveOrganization | null;

type AppCtxProps = {
  activeOrganization: ActiveOrganization;
  setActiveOrganization: Dispatch<SetStateAction<ActiveOrganization>>;
};

const AppCtx = createContext({} as AppCtxProps);

export function AppProvider({
  initialOrg,
  children,
}: {
  initialOrg: ActiveOrganization;
  children: Readonly<ReactNode>;
}) {
  const [activeOrganization, setActiveOrganization] =
    useState<ActiveOrganization>(initialOrg);
  // const [user, setUser] = useState<User>(initialUser);

  return (
    <AppCtx value={{ activeOrganization, setActiveOrganization }}>
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
