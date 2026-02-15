"use server";

import { cacheTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { userKeys } from "@/lib/fn/keys";

export async function $getSession(props: {
  headers: Awaited<ReturnType<typeof headers>>;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    return session;
  } catch (error) {
    // Auth check failed (network error, etc.) - redirect to login
    throw redirect("/sign-in");
  }
}

// export const signUpFn = createServerFn()
//   .inputValidator((data: z.infer<typeof signUpFormSchema>) => data)
//   .handler(async ({ data }) => {
//     const isValid = signUpFormSchema.safeParse(data);
//
//     if (!isValid) throw new Error("Error validating the input data");
//
//     const { name, email, password } = data;
//
//     try {
//       const data = await auth.api.signUpEmail({
//         body: { name, email, password },
//         headers: getRequestHeaders(),
//       });
//       return data;
//     } catch (e) {
//       console.error(`Error signing up: ${(e as Error).cause}`);
//       throw e;
//     }
//   });

// export const signInFn = createServerFn()
//   .inputValidator((data: z.infer<typeof signInFormSchema>) => data)
//   .handler(async ({ data }) => {
//     const isValid = signInFormSchema.safeParse(data);
//
//     if (!isValid) throw new Error("Error validating the input data");
//
//     const { email, password, rememberMe } = data;
//
//     try {
//       const data = await auth.api.signInEmail({
//         body: { email, password, rememberMe },
//         headers: getRequestHeaders(),
//       });
//       return data;
//     } catch (e) {
//       console.error(`Error signing up: ${(e as Error).cause}`);
//       throw e;
//     }
//   });

export async function $signOut() {
  "use server";
  try {
    const data = await auth.api.signOut({ headers: await headers() });
    return data;
  } catch (e) {
    console.error(`Error signing out: ${(e as Error).cause}`);
    throw e;
  }
}
