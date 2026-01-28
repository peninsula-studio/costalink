import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { CheckIcon, Eye, EyeClosed, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
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
import { TypographyH1 } from "@/components/ui/typography";
import { authClient } from "@/lib/auth/client";
import { signInFn } from "@/lib/fn/auth";
import { cn } from "@/lib/utils";
import { emailSchema } from "@/lib/zod/schemas/auth";
import type { FileRouteTypes } from "@/routeTree.gen";

export const signInFormSchema = z.object({
  email: emailSchema,
  password: z.string(),
  rememberMe: z.boolean(),
});

export function SignInForm({
  className,
  onSuccess,
  callbackUrl = "/dashboard",
  ...props
}: React.ComponentProps<"div"> & {
  onSuccess?: () => void;
  // callbackUrl?: FileRouteTypes["to"];
  callbackUrl?: string;
}) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { formState, handleSubmit, register, setError, clearErrors } = useForm({
    defaultValues: { email: "", password: "", rememberMe: true },
    mode: "onSubmit",
    resolver: zodResolver(signInFormSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof signInFormSchema>) => {
      clearErrors();
      return await signInFn({ data });
    },
    onError: (e) => {
      setError("root", { message: "Wrong credentials" });
      console.error(`Sign-in error -> "/sign-in": ${e.message}`);
      toast.error("Credenciales incorrectas");
    },
    onSuccess: (data) => {
      router.invalidate();
      toast.success(`Welcome ${data.user.name}`);
      router.navigate({ to: callbackUrl });
    },
  });

  return (
    <div
      className={cn("flex flex-col gap-y-4 md:gap-y-6", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        {/* <CardHeader className="text-center"> */}
        {/*   <CardTitle className="text-xl">Inicio de sesión</CardTitle> */}
        {/*   <CardDescription>Introduzca sus credenciales</CardDescription> */}
        {/* </CardHeader> */}
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-4 md:p-6"
            onSubmit={handleSubmit((data) => mutate(data))}
          >
            <FieldSet>
              <FieldLegend className="text-center">
                <TypographyH1 className="font-bold text-2xl">
                  Bienvenido
                </TypographyH1>
              </FieldLegend>
              <FieldDescription className="text-center text-base">
                Inicio de sesión en Selecciona-RRHH
              </FieldDescription>

              <FieldGroup>
                <Field data-invalid={!!formState.errors.email}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    aria-invalid={!!formState.errors.email}
                    autoComplete="email"
                    id="email"
                    placeholder="ejemplo@ejemplo.com"
                    {...register("email", { required: true })}
                  />
                  <FieldError errors={[formState.errors.email]} />
                </Field>

                <Field data-invalid={!!formState.errors.password}>
                  <FieldLabel className="w-full" htmlFor="password">
                    Contraseña
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

                <Field orientation="horizontal">
                  <Checkbox
                    id="rememberMe"
                    {...register("rememberMe")}
                    defaultChecked
                  />
                  <FieldLabel className="w-full" htmlFor="rememberMe">
                    <span className="text-muted-foreground">Recuérdame</span>
                    <Link
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      to="/sign-in"
                    >
                      Olvidé mi contraseña
                    </Link>
                  </FieldLabel>
                </Field>

                {formState.errors.root && (
                  <FieldError className="flex items-center justify-center gap-2 rounded bg-destructive/10 py-2 text-center">
                    <XCircle className="size-4" />{" "}
                    {formState.errors.root.message}
                  </FieldError>
                )}

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
                      ? "Iniciando sesión..."
                      : formState.isSubmitSuccessful
                        ? "Sesión iniciada"
                        : "Iniciar sesión"}
                  </Button>
                  <FieldDescription className="px-6 pt-2 text-center">
                    No tiene una cuenta? <Link to="/sign-in">Crear cuenta</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
          <div className="relative hidden size-full bg-muted md:block">
            <img
              alt="placeholder"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              src="/placeholder.svg"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Al continuar está prestando consentimiento a nuestros{" "}
        <Link to="/">Términos de servicio</Link> y{" "}
        <Link to="/">Política de privacidad</Link>.
      </FieldDescription>
    </div>
  );
}
