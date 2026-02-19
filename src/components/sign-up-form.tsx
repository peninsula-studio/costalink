import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { setPassword } from "better-auth/api";
import { CheckCircle2, CheckIcon, Eye, EyeClosed, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { $signUpFn } from "@/lib/fn/auth";
import { cn } from "@/lib/utils";
import { signUpFormSchema } from "@/lib/zod/schemas/auth";
import type { FileRouteTypes } from "@/routeTree.gen";

export function SignUpForm({
  onSuccess,
  callbackUrl = "/app",
  ...props
}: React.ComponentProps<typeof Card> & {
  onSuccess?: () => void;
  callbackUrl?: FileRouteTypes["to"];
}) {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { formState, handleSubmit, register, clearErrors, setError, watch } =
    useForm({
      defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
      mode: "onSubmit",
      resolver: zodResolver(signUpFormSchema),
    });

  const passwordValue = watch("password");

  const validations = [
    { text: "At least 8 characters", valid: passwordValue.length >= 8 },
    { text: "Contains a number", valid: /\d/.test(passwordValue) },
    {
      text: "Contains uppercase letter",
      valid: /[A-Z]/.test(passwordValue),
    },
    {
      text: "Contains special character",
      valid: /[!@#$%^&*]/.test(passwordValue),
    },
  ];

  const strength = validations.filter((v) => v.valid).length;

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-muted";
    if (score <= 1) return "bg-destructive";
    if (score <= 2) return "bg-warning";
    if (score <= 3) return "bg-success";
    return "bg-success";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "";
    if (score <= 1) return "Weak";
    if (score <= 2) return "Moderate";
    if (score <= 3) return "Strong";
    return "Very Strong";
  };

  const getStrengthTextColor = (score: number) => {
    if (score === 0) return "text-muted-foreground";
    if (score <= 1) return "text-destructive";
    if (score <= 2) return "text-warning";
    if (score <= 3) return "text-success";
    return "text-success";
  };

  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof signUpFormSchema>) => {
      clearErrors();
      return await $signUpFn({ data });
    },
    onError: (e) => {
      setError("root", { message: "Error en la creación de sesión" });
      console.error(`Sign-up error -> "/sign-up": ${e.message}`);
      toast.error("Credenciales incorrectas");
    },
    onSuccess: (data) => {
      toast.success(`Bienvenido ${data.user.name || ""}`);
      router.navigate({ to: callbackUrl });
    },
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
        <form onSubmit={handleSubmit((data) => mutate(data))}>
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
                <div className="flex flex-col gap-y-2">
                  <InputGroup className="relative">
                    <InputGroupInput
                      aria-invalid={!!formState.errors.password}
                      autoComplete="password"
                      id="password"
                      required
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <InputGroupButton
                      onClick={() => setShowPassword((v) => !v)}
                      size="sm"
                      type="button"
                      variant="ghost"
                    >
                      {showPassword ? (
                        <Eye className="size-4 text-muted-foreground" />
                      ) : (
                        <EyeClosed className="size-4 text-muted-foreground" />
                      )}
                    </InputGroupButton>
                  </InputGroup>
                  <div className="flex flex-col gap-y-2">
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full transition-all duration-500 ease-out ${getStrengthColor(
                          strength,
                        )}`}
                        style={{ width: `${(strength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between font-medium text-xs">
                      <span className="text-muted-foreground">
                        Password must contain
                      </span>
                      <span className={getStrengthTextColor(strength)}>
                        {getStrengthText(strength)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    {validations.map((validation, index) => (
                      <div
                        className={cn(
                          "flex items-center gap-2 text-muted-foreground text-sm transition-colors duration-200",
                          { "text-success": validation.valid },
                          {
                            "text-destructive":
                              formState.errors.password && !validation.valid,
                          },
                        )}
                        key={index}
                      >
                        {validation.valid ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <X className="h-3.5 w-3.5" />
                        )}
                        <span className="text-[13px]">{validation.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
