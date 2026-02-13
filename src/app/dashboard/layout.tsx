import { getCookieCache } from "better-auth/cookies";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type ReactNode, Suspense } from "react";
import { AppProvider } from "@/components/app-provider";
import { $getSession } from "@/lib/fn/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const session = await getCookieCache(await headers());
  const session = await $getSession();
  // const activeOrganization = await $getActiveOrganization();

  if (!session) redirect("/sign-in");

  // if (session.session.activeOrganizationId) {
  //   redirect(`/dashboard/${session.session.activeOrganizationId}`);
  // }

  return <AppProvider user={session.user}>{children}</AppProvider>;
}
