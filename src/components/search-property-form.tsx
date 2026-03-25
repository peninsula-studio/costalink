import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { COMUNIDADES_AUTONOMAS, PROVINCIAS } from "@/lib/constants";
import { searchPropertyFn } from "@/lib/fn/property";
import { SearchPropertyResult } from "./search-property-result";

export const searchPropertySchema = z.object({
  id: z.string().optional(),
  ref: z.string().optional(),
  price_min: z.number().optional(),
  price_max: z.number().optional(),
  town: z.string().optional(),
  // type: z.enum(PROPERTY_TYPES).optional(),
  type: z.string().optional(),
  province: z.enum(Object.values(COMUNIDADES_AUTONOMAS).flat()).optional(),
  comunidad: z.enum(Object.keys(COMUNIDADES_AUTONOMAS).flat()).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(10),
});

export function SearchPropertyForm() {
  const searchParams = useSearch({
    from: "/(app)/$organizationId/property/search",
  });

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues: { province: searchParams.province },
    mode: "onSubmit",
    resolver: zodResolver(searchPropertySchema),
    resetOptions: { keepValues: true },
  });

  const { data, isFetching } = useQuery({
    // enabled: false,
    queryKey: ["property", "search", ...Object.values(searchParams)],
    queryFn: async () => await searchPropertyFn({ data: searchParams }),
    // staleTime: 99999999999,
  });

  // const { data, mutateAsync, isPending } = useMutation({
  //   mutationKey: ["property", "search", ...Object.values(searchParams)],
  //   mutationFn: async () => await searchPropertyFn({ data: searchParams }),
  //   networkMode: "offlineFirst",
  // });

  const provinciasItems = PROVINCIAS.map((o) => ({ label: o, value: o }));

  return (
    <div className="flex flex-col gap-xs">
      <form
        className="flex flex-col gap-sm"
        onSubmit={handleSubmit(async (data) => {
          await navigate({
            to: ".",
            search: {
              ...data,
              page: data.page,
              pageSize: data.pageSize,
            },
          });
        })}
      >
        <FieldSet className="*:flex-1 md:flex-row">
          <Field className="max-w-62">
            <FieldContent>
              <FieldLabel>Search</FieldLabel>
              <Input placeholder="Search by ref, town, province..." />
            </FieldContent>
          </Field>

          <Controller
            control={control}
            name="province"
            render={({ field, fieldState }) => (
              <Field
                aria-invalid={fieldState.invalid}
                className="max-w-3xs"
                data-invalid={fieldState.invalid}
                orientation="responsive"
              >
                <FieldError errors={[fieldState.error]} />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Province</FieldLabel>
                  <Select
                    data-invalid={fieldState.invalid}
                    defaultValue=""
                    id={field.name}
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger
                      aria-invalid={!!fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select Province..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {provinciasItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>
            )}
            rules={{ required: true }}
          />
        </FieldSet>

        <Field className="w-fit">
          <Button
            disabled={isFetching}
            // disabled={isPending}
            type="submit"
          >
            {isFetching ? (
              // {isPending ? (
              <>
                <Spinner data-icon="inline-start" />
                Searching
              </>
            ) : (
              <>
                <SearchIcon data-icon="inline-start" /> Search
              </>
            )}
          </Button>
        </Field>
      </form>

      <SearchPropertyResult
        data={data}
        isLoading={isFetching}
        // isLoading={isPending}
      />
    </div>
  );
}
