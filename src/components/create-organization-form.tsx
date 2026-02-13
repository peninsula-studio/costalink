import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import z from "zod";
import { InputValidCheck } from "@/components/input-valid-check";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldContent,
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
import {
  organizationPlan,
  organizationSlug,
} from "@/lib/zod/schemas/organization";

export const createOrganizationFormSchema = z.object({
  name: z.string().min(4, { error: "Mínimo 4 caracteres" }),
  slug: organizationSlug,
  plan: organizationPlan,
});

export function CreateOrganizationForm({
  onSuccess,
  callbackURL,
  ...props
}: React.ComponentProps<typeof Card> & {
  onSuccess?: () => void;
  callbackURL?: string;
}) {
  const router = useRouter();

  const { formState, handleSubmit, setValue, setError, clearErrors, register } =
    useForm({
      defaultValues: { name: "", slug: "" },
      mode: "onSubmit",
      resolver: zodResolver(createOrganizationFormSchema),
    });

  const validCheckFn = React.useCallback(async (val: string) => {
    const { data, error } = await authClient.organization.checkSlug({
      slug: val,
    });
    const result = error ? false : data.status;
    return result;
  }, []);

  const submit = async ({
    name,
    slug,
  }: z.infer<typeof createOrganizationFormSchema>) => {
    clearErrors();
    const { data, error } = await authClient.organization.create({
      name,
      slug,
    });
    if (error) {
      setError("root", { message: "Error al crear la organización" });
      if (error.message === "Organization already exists") {
        setError("slug", { message: "Este subdominio ya está siendo usado" });
      }
      console.error(`Error creating organization -> ${error.message}`);
      toast.error("Error al crear la organización");
    }
    if (data) {
      router.invalidate();
      toast.success(`Organización creada`, {
        description: `Organización "${data?.name}" con ruta "${data?.slug}" creada con éxito`,
      });
    }
  };

  return (
    <Card {...props}>
      <form
        onSubmit={handleSubmit(async (data) => {
          await submit(data);
        })}
      >
        <CardContent className="pb-4">
          <FieldSet>
            <FieldLegend className="text-center">
              Creación de Organización
            </FieldLegend>
            <FieldDescription className="text-center">
              Creación de organización
            </FieldDescription>
            <FieldGroup>
              <Field data-invalid={!!formState.errors.name}>
                <FieldLabel htmlFor="name">Nombre</FieldLabel>
                <FieldDescription>
                  El nombre de la Organización
                </FieldDescription>
                <Input
                  aria-invalid={!!formState.errors.name}
                  autoComplete="organization"
                  id="name"
                  placeholder=""
                  {...register("name", {
                    required: true,
                  })}
                />
                <FieldError errors={[formState.errors.name]} />
              </Field>

              <Field data-invalid={!!formState.errors.slug}>
                <FieldContent>
                  <FieldLabel htmlFor="name">Subdominio</FieldLabel>
                  <FieldDescription>
                    El subdominio a usar por la organización
                  </FieldDescription>
                  <InputValidCheck
                    aria-invalid={!!formState.errors.slug}
                    autoComplete=""
                    id="slug"
                    placeholder=""
                    validCheckFn={validCheckFn}
                    {...register("slug", {
                      required: true,
                      onChange: (e) => {
                        setValue(
                          "slug",
                          slugify(e.currentTarget.value, {
                            trim: false,
                            lower: true,
                          }),
                        );
                      },
                    })}
                  />
                  <FieldError errors={[formState.errors.slug]} />
                </FieldContent>
              </Field>

              {formState.errors.root && (
                <FieldError className="flex items-center justify-center gap-2 rounded bg-destructive/10 py-2 text-center">
                  <XCircle className="size-4" /> {formState.errors.root.message}
                </FieldError>
              )}
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter>
          <FieldGroup>
            <Field>
              <Button disabled={formState.isSubmitting} type="submit">
                {formState.isSubmitting && <Spinner />}
                Crear
              </Button>
              {/* <FieldDescription className="px-6 pt-2 text-center"> */}
              {/*   No tiene una cuenta? <Link href="/sign-up">Crear cuenta</Link> */}
              {/* </FieldDescription> */}
            </Field>
          </FieldGroup>
        </CardFooter>
      </form>
    </Card>
  );
}
