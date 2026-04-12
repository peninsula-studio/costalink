import { userKeys } from "@repo/types/queries/user-keys";
import { queryOptions } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.session(),
    queryFn: async () => {
      try {
        const { data, error } = await authClient.getSession();
        if (error) {
          console.error(error);
          throw new Error(error.message);
        }
        return data;
      } catch (e) {
        console.error(`Unable to get current session: ${e}`);
      }
    },
  });
