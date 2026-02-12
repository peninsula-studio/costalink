import { queryOptions } from "@tanstack/react-query";
import { isRedirect, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeaders } from "@tanstack/react-start/server";
import { getSessionCookie } from "better-auth/cookies";
import type z from "zod";
import { signInFormSchema } from "@/components/sign-in-form";
import { auth } from "@/lib/auth";
import { userKeys } from "@/lib/fn/keys";
import { signUpFormSchema } from "@/lib/zod/schemas/auth";

export const $checkSessionCookieFn = createServerFn().handler(() => {
  const sessionCookie = getSessionCookie(getRequest());
  return sessionCookie;
});

export const getSessionFn = createServerFn().handler(async () => {
  try {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });
    return session;
  } catch (error) {
    // Re-throw redirects (they're intentional, not errors)
    if (isRedirect(error)) throw error;
    // Auth check failed (network error, etc.) - redirect to login
    throw redirect({ to: "/sign-in" });
  }
});

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.session(),
    queryFn: getSessionFn,
  });

export const signUpFn = createServerFn()
  .inputValidator((data: z.infer<typeof signUpFormSchema>) => data)
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

export const signInFn = createServerFn()
  .inputValidator((data: z.infer<typeof signInFormSchema>) => data)
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

export const signOutFn = createServerFn().handler(async () => {
  try {
    const data = await auth.api.signOut({ headers: getRequestHeaders() });
    return data;
  } catch (e) {
    console.error(`Error signing out: ${(e as Error).cause}`);
    throw e;
  }
});
