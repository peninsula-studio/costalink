import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type z from "zod";
import { signInFormSchema } from "@/components/sign-in-form";
import { auth } from "@/lib/auth";
import { userKeys } from "@/lib/fn/keys";
import { signUpFormSchema } from "@/lib/zod/schemas/auth";

export const getSessionFn = createServerFn().handler(
  async () => await auth.api.getSession({ headers: getRequestHeaders() }),
);

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: [userKeys.session()],
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
      });
      console.info(`Signed up with email: ${data.user.email}`);
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
      });
      console.info(`Signed up with email: ${data.user.email}`);
      return data;
    } catch (e) {
      console.error(`Error signing up: ${(e as Error).cause}`);
      throw e;
    }
  });
