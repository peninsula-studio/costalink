import { queryOptions } from "@tanstack/react-query";
import { authClient } from "../auth-client";

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: ["user", "session"],
    queryFn: async () => {
      const { data, error } = await authClient.getSession();
      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
