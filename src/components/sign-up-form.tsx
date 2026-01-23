import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "@tanstack/react-router";
import { CheckIcon, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/client";
import { signUpFormSchema } from "@/lib/zod/schemas/auth";
import type { FileRouteTypes } from "@/routeTree.gen";

export function SignUpForm({
  onSuccess,
  callbackUrl = "/dashboard",
  ...props
}: React.ComponentProps<typeof Card> & {
  onSuccess?: () => void;
  callbackUrl?: FileRouteTypes["to"];
}) {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const submit = async ({
    email,
    password,
    name,
  }: z.infer<typeof signUpFormSchema>) => {
    clearErrors();
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (error) {
      setError("root", { message: "Credenciales incorrectas" });
      console.error(`Sign-up error -> "/sign-up": ${error.message}`);
      toast.error("Credenciales incorrectas");
    }
    if (data) {
      toast.success(`Bienvenido ${data?.user.name}`);
      router.navigate({ to: callbackUrl });
    }
  };

  const { formState, handleSubmit, register, clearErrors, setError } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onSubmit",
    resolver: zodResolver(signUpFormSchema),
  });

  return (
    <Card {...props}>
      {/* <CardHeader> */}
      {/*   <CardTitle>Crea una cuenta</CardTitle> */}
      {/*   <CardDescription> */}
      {/*     Introduce tu información para crear una cuenta */}
      {/*   </CardDescription> */}
      {/* </CardHeader> */}
      <CardContent>
        <form onSubmit={handleSubmit(async (data) => await submit(data))}>
          <FieldSet>
            <FieldLegend className="text-center">Create an account</FieldLegend>
            <FieldDescription className="text-center">
              Sign up at CostaLink to join the listing share system that nets
              you more sales
            </FieldDescription>
            <FieldGroup>
              <Field data-invalid={!!formState.errors.name}>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                  aria-invalid={!!formState.errors.name}
                  autoComplete="name"
                  id="name"
                  maxLength={128}
                  minLength={2}
                  placeholder="John Doe"
                  required
                  type="text"
                  {...register("name")}
                />
                <FieldError errors={[formState.errors.name]} />
              </Field>

              <Field data-invalid={!!formState.errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  aria-invalid={!!formState.errors.email}
                  autoComplete="email"
                  id="email"
                  placeholder="ejemplo@ejemplo.com"
                  required
                  type="email"
                  {...register("email")}
                />
                <FieldError errors={[formState.errors.email]} />
                <FieldDescription>
                  Usaremos este email para contactar contigo. No será compartido
                  con ningún tercero externo a nosotros.
                </FieldDescription>
              </Field>

              <Field data-invalid={!!formState.errors.password}>
                <FieldLabel className="w-full" htmlFor="password">
                  Password
                </FieldLabel>
                <div className="flex gap-2">
                  <Input
                    aria-invalid={!!formState.errors.password}
                    autoComplete="password"
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <Button
                    aria-description="Toggle password visibility"
                    className="bg-secondary text-foreground!"
                    onClick={() => setShowPassword((v) => !v)}
                    size="icon"
                    variant="outline"
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </Button>
                </div>
                <FieldError errors={[formState.errors.password]} />
              </Field>

              <Field data-invalid={!!formState.errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm your password
                </FieldLabel>

                <Input
                  aria-invalid={!!formState.errors.confirmPassword}
                  autoComplete="new-password"
                  id="confirmPassword"
                  required
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                />

                <FieldError errors={[formState.errors.confirmPassword]} />
                <FieldDescription>
                  Please confirm your password
                </FieldDescription>
              </Field>

              <FieldGroup>
                <Field>
                  <Button
                    disabled={
                      formState.isSubmitting || formState.isSubmitSuccessful
                    }
                    type="submit"
                  >
                    {formState.isSubmitting && <Spinner />}
                    {formState.isSubmitSuccessful && <CheckIcon />}
                    {formState.isSubmitting
                      ? "Signing up..."
                      : formState.isSubmitSuccessful
                        ? "Successfully signed up!"
                        : "Sign up"}
                  </Button>
                  {/* <Button type="button" variant="outline"> */}
                  {/*   Sign up with Google */}
                  {/* </Button> */}
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link to="/sign-in">Sign in</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
