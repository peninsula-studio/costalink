import { useLocation, useRouter } from "@tanstack/react-router";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  use,
  useEffect,
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

export function AppProvider({
  initialOrg,
  children,
}: {
  initialOrg: ActiveOrganization;
  children: Readonly<ReactNode>;
}) {
  const [activeOrganization, setActiveOrganization] =
    useState<AppCtxProps["activeOrganization"]>(initialOrg);

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
