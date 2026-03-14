import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { InputValidCheck } from "@/components/input-valid-check";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { kyeroPropertySchema } from "@/lib/fn/kyero/schemas";
import {
  checkPropertyReferenceFn,
  createPropertyMutationOptions,
} from "@/lib/fn/property";

// export const createPropertyFormSchema = z.object({
//   name: z.string().min(4, { error: "Mínimo 4 caracteres" }),
//   slug: organizationSlug,
//   plan: organizationPlan,
// });

const createPropertyFormSchema = kyeroPropertySchema;

export function CreatePropertyForm({
  onSuccess,
  callbackURL,
  ...props
}: React.ComponentProps<typeof Card> & {
  onSuccess?: () => void;
  callbackURL?: string;
}) {
  const { formState, handleSubmit, setValue, setError, clearErrors, register } =
    useForm({
      defaultValues: { ref: "" },
      mode: "onSubmit",
      resolver: zodResolver(createPropertyFormSchema),
    });

  const isValidFn = React.cache(async (val: string) => {
    const refExists = await checkPropertyReferenceFn({
      data: { ref: val },
    });
    return refExists;
  });

  const { mutateAsync } = useMutation({
    ...createPropertyMutationOptions(),
    onMutate: () => {
      clearErrors();
    },
  });

  return (
    <Card {...props}>
      <CardHeader>Create a Property</CardHeader>
      <CardContent>
        <form
          name="Property Creation Form"
          onSubmit={handleSubmit(async (data) => {
            await mutateAsync(data, {
              onError: async (error) => {
                setError("root", { message: error.message });
                toast.error(error.message);
              },
              onSuccess: async (result, _data) => {
                toast.success(
                  `Property with ref: ${result.ref} created successfully`,
                );
              },
            });
          })}
        >
          <FieldGroup>
            <Field data-invalid={false}>
              <FieldLabel htmlFor="reference">Reference</FieldLabel>
              <FieldContent>
                <InputValidCheck
                  aria-invalid={!!formState.errors.ref}
                  autoComplete=""
                  id="reference"
                  placeholder="Reference"
                  required
                  validCheckFn={isValidFn}
                  {...register("ref", {
                    required: true,
                    onChange: (e) => {
                      setValue(
                        "ref",
                        slugify(e.currentTarget.value, {
                          trim: false,
                          lower: true,
                        }),
                      );
                    },
                  })}
                />
              </FieldContent>
            </Field>

            {/* <Field data-invalid={false}>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Input
                id="date"
                name="date"
                placeholder="YYYY-MM-DD"
                required
                type="date"
              />
            </Field> */}

            <Field data-invalid={false}>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                id="price"
                name="price"
                placeholder="Enter price"
                required
                type="number"
              />
            </Field>

            <Field data-invalid={false}>
              <FieldLabel htmlFor="type">Property Type</FieldLabel>
              <Input
                id="type"
                name="type"
                placeholder="Enter property type"
                required
                type="text"
              />
            </Field>

            <Field data-invalid={false}>
              <FieldLabel htmlFor="town">Town</FieldLabel>
              <Input
                id="town"
                name="town"
                placeholder="Enter town"
                required
                type="text"
              />
            </Field>

            <Field data-invalid={false}>
              <FieldLabel htmlFor="province">Province</FieldLabel>
              <Input
                id="province"
                name="province"
                placeholder="Enter province"
                required
                type="text"
              />
            </Field>

            <Field>
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
