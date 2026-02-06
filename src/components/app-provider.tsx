import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  use,
  useState,
} from "react";
import type { auth } from "@/lib/auth";

type ActiveOrganization =
  | typeof auth.$Infer.ActiveOrganization
  | null
  | undefined;

type AppCtxProps = {
  activeOrganization: ActiveOrganization;
  setActiveOrganization: Dispatch<SetStateAction<ActiveOrganization>>;
};

const AppCtx = createContext({} as AppCtxProps);

export function AppProvider({ children }: { children: Readonly<ReactNode> }) {
  const [activeOrganization, setActiveOrganization] =
    useState<AppCtxProps["activeOrganization"]>(undefined);

  return (
    <AppCtx value={{ activeOrganization, setActiveOrganization }}>
      {children}
    </AppCtx>
  );
}

export function useAppCtx() {
  const val = use(AppCtx);
  if (!val)
    throw new Error("useActiveOrganization called outside of ThemeProvider!");
  return val;
}
