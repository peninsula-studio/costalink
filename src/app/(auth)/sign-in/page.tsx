import { SignInForm } from "@/components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100svh-var(--topnav-h))] w-full items-center justify-center p-4 md:py-8">
      <SignInForm
        callbackUrl={"/dashboard"}
        className="w-full max-w-sm md:max-w-4xl"
      />
    </div>
  );
}
