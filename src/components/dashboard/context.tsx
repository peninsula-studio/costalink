import * as React from "react";
import type { auth } from "@/lib/auth";

type ActiveOrganization =
  | typeof auth.$Infer.ActiveOrganization
  | null
  | undefined;

interface AppSidebarCtxProps {
  activeOrganization: ActiveOrganization;
  setActiveOrganization: React.Dispatch<
    React.SetStateAction<ActiveOrganization>
  >;
}

const AppSidebarCtx = React.createContext({} as AppSidebarCtxProps);

export const AppSidebarCtxProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const [activeOrganization, setActiveOrganization] =
    React.useState<AppSidebarCtxProps["activeOrganization"]>(undefined);

  return (
    <AppSidebarCtx.Provider
      value={{ activeOrganization, setActiveOrganization }}
    >
      {children}
    </AppSidebarCtx.Provider>
  );
};

export function useAppSidebarCtx() {
  const val = React.use(AppSidebarCtx);
  if (!val) throw new Error("useTheme called outside of ThemeProvider!");
  return val;
}
