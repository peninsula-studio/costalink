import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignUpForm } from "@/components/sign-up-form";
import { getSessionFn } from "@/lib/fn/auth";
import type { FileRouteTypes } from "@/routeTree.gen";

export type SignInRouteSearch = {
  callbackUrl?: FileRouteTypes["to"];
};

export const Route = createFileRoute("/(auth)/sign-up")({
  beforeLoad: async () => {
    const session = await getSessionFn();
    if (session) throw redirect({ to: "/app" });
  },
  // validateSearch: zodValidator(z.object({ callbackUrl: z.string() })),
  validateSearch: (search: Record<string, unknown>): SignInRouteSearch => {
    const parsedSearch = { ...search } as SignInRouteSearch;
    return parsedSearch;
  },
  component: SignInPage,
});

function SignInPage() {
  const { callbackUrl } = Route.useSearch();

  return (
    <div className="flex min-h-[calc(100svh-var(--topnav-h))] w-full items-center justify-center p-4 md:py-8">
      <SignUpForm
        callbackUrl={callbackUrl}
        className="w-full max-w-sm md:max-w-xl"
      />
    </div>
  );
}
