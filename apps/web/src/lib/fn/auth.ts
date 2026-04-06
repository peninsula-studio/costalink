import { auth } from "@repo/auth";
import { signUpFormSchema } from "@repo/types/schemas/auth";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeaders } from "@tanstack/react-start/server";
import { getSessionCookie } from "better-auth/cookies";
import type { z } from "zod";
import { signInFormSchema } from "@/components/sign-in-form";
import { authClient } from "@/lib/auth-client";
import { userKeys } from "@/lib/fn/keys";
import { honoClient } from "@/lib/hono-client";
import { authMiddleware } from "@/lib/middleware/auth";

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
    // const kek = await honoClient.api.auth["*"].$post(undefined);
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

// export const signInEmailFn = createServerFn()
//   .inputValidator(signInFormSchema)
//   .handler(async ({ data }) => {
//     // const isValid = signInFormSchema.safeParse(data);
//     //
//     // if (!isValid) throw new Error("Error validating the input data");
//
//     const { email, password, rememberMe } = data;
//
//     try {
//       // const data = await auth.api.signInEmail({
//       //   body: { email, password, rememberMe },
//       //   headers: getRequestHeaders(),
//       // });
//
//       // const data = await honoClient["sign-in"].email.$post({
//       //   json: { email, password, rememberMe },
//       // });
//
//       const data = await honoClient["sign-in"].email.$post({
//         json: { email, password, rememberMe },
//       });
//       return data;
//     } catch (e) {
//       console.error(`Error signing up: ${(e as Error).cause}`);
//       throw e;
//     }
//   });

export const signInMutationOptions = () =>
  mutationOptions({
    mutationFn: async (values: z.infer<typeof signInFormSchema>) => {
      const isValid = signInFormSchema.safeParse(values);
      if (!isValid) throw new Error("Error validating the input data");
      const { email, password, rememberMe } = values;
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });
      if (error) {
        console.error(`Error signing up: ${error.message}`);
        throw error;
      }
      return data;
    },
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
