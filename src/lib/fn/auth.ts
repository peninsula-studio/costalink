import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { userKeys } from "@/lib/fn/keys";

export const getSessionFn = createServerFn().handler(
  async () => await auth.api.getSession({ headers: getRequestHeaders() }),
);

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: [userKeys.session()],
    queryFn: getSessionFn,
  });
