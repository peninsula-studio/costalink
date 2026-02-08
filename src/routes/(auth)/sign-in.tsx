import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "@/components/sign-in-form";

export type SignInRouteSearch = {
  callbackUrl?: string;
};

export const Route = createFileRoute("/(auth)/sign-in")({
  beforeLoad: async ({ context }) => {
    if (context.user) throw redirect({ to: "/app" });
  },
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
      <SignInForm
        callbackUrl={callbackUrl}
        className="w-full max-w-sm md:max-w-4xl"
      />
    </div>
  );
}
