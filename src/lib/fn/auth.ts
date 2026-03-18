import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeaders } from "@tanstack/react-start/server";
import { getSessionCookie } from "better-auth/cookies";
import { z } from "zod";
import { signInFormSchema } from "@/components/sign-in-form";
import { auth } from "@/lib/auth";
import { userKeys } from "@/lib/fn/keys";
import { signUpFormSchema } from "@/lib/zod/schemas/auth";
import { authMiddleware } from "@/middleware/auth";

export const checkSessionCookieFn = createServerFn().handler(() => {
  const sessionCookie = getSessionCookie(getRequest());
  return sessionCookie;
});

export const checkSessionFn = createServerFn().handler(async () => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });
  return session;
});

export const getSessionFn = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context.session;
  });

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.session(),
    queryFn: getSessionFn,
  });

export const signUpFn = createServerFn()
  .inputValidator(signUpFormSchema)
  .handler(async ({ data }) => {
    const isValid = signUpFormSchema.safeParse(data);

    if (!isValid) throw new Error("Error validating the input data");

    const { name, email, password } = data;

    try {
      const data = await auth.api.signUpEmail({
        body: { name, email, password },
        headers: getRequestHeaders(),
      });
      return data;
    } catch (e) {
      console.error(`Error signing up: ${(e as Error).cause}`);
      throw e;
    }
  });

export const signInEmailFn = createServerFn()
  .inputValidator(signInFormSchema)
  .handler(async ({ data }) => {
    const isValid = signInFormSchema.safeParse(data);

    if (!isValid) throw new Error("Error validating the input data");

    const { email, password, rememberMe } = data;

    try {
      const data = await auth.api.signInEmail({
        body: { email, password, rememberMe },
        headers: getRequestHeaders(),
      });
      return data;
    } catch (e) {
      console.error(`Error signing up: ${(e as Error).cause}`);
      throw e;
    }
  });

export const signInMutationOptions = () =>
  mutationOptions({
    mutationFn: signInEmailFn,
    onError: (e) => {
      console.error(`Sign-in error -> "/sign-in": ${e.message}`);
    },
    onSuccess: async (_ret, _data, _, { client }) => {
      await client.resetQueries({ queryKey: userKeys.session() });
      return;
    },
  });

export const signOutFn = createServerFn().handler(async () => {
  try {
    const data = await auth.api.signOut({ headers: getRequestHeaders() });
    return data;
  } catch (e) {
    console.error(`Error signing out: ${(e as Error).cause}`);
    throw e;
  }
});

export const signOutMutationOptions = () =>
  mutationOptions({
    mutationFn: signOutFn,
    onError: (e) => {
      console.error(`Sign-out error -> "/sign-out": ${e.message}`);
    },
    onSuccess: async (_ret, _data, _, { client }) => {
      await client.resetQueries({ queryKey: userKeys.session() });
      return;
    },
  });
