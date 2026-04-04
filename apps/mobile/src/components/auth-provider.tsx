import { authClient } from "@repo/auth/client";
import React from "react";

type AuthContextProps = {
  session: typeof authClient.$Infer.Session | null;
  setSession: React.Dispatch<
    React.SetStateAction<typeof authClient.$Infer.Session | null>
  >;
};

const AuthContext = React.createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactElement }) {
  const { data: sessionData, isPending } = authClient.useSession();

  const [session, setSession] = React.useState<
    typeof authClient.$Infer.Session | null
  >(null);

  React.useEffect(() => {
    setSession(sessionData);
  }, [sessionData]);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => React.useContext(AuthContext);
