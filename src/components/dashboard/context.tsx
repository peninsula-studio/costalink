import * as React from "react";
import type { auth } from "@/lib/auth";

type ActiveOrganization =
  | typeof auth.$Infer.ActiveOrganization
  | null
  | undefined;

interface DashboardCtxProps {
  activeOrganization: ActiveOrganization;
  setActiveOrganization: React.Dispatch<
    React.SetStateAction<ActiveOrganization>
  >;
}

const DashboardCtx = React.createContext({} as DashboardCtxProps);

export const DashboardCtxProvider = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const [activeOrganization, setActiveOrganization] =
    React.useState<DashboardCtxProps["activeOrganization"]>(undefined);

  return (
    <DashboardCtx.Provider
      value={{ activeOrganization, setActiveOrganization }}
    >
      {children}
    </DashboardCtx.Provider>
  );
};

export function useAppSidebarCtx() {
  const val = React.use(DashboardCtx);
  if (!val) throw new Error("useTheme called outside of ThemeProvider!");
  return val;
}
