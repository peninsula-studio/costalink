import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, SearchIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FlexContainer } from "@/components/container";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { COMUNIDADES_AUTONOMAS, PROVINCIAS } from "@/lib/constants";
import { searchPropertyFn } from "@/lib/fn/property";
import { cn } from "@/lib/utils";
import { PropertySearchResultTableBody } from "./property-search-result-grid";
import { Spinner } from "./ui/spinner";

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
});

export function SearchPropertyForm() {
  const { type, sortBy, sortOrder, page, pageSize } = useSearch({
    from: "/app/$organizationId/property/search",
  });

  const { organizationId } = useParams({
    from: "/app/$organizationId/property/search",
  });

  const navigate = useNavigate({
    from: "/app/$organizationId/property/search",
  });

  const handleSort = (field: string) => {
    const currentSort = sortOrder || "desc";
    const newSort = sortBy === field && currentSort === "desc" ? "asc" : "desc";
    navigate({
      to: ".",
      search: {
        type,
        sortBy: field as "price" | "createdAt" | "ref",
        sortOrder: newSort,
        page: 1,
      },
    });
  };

  const arrowDirection = (dir?: "asc" | "desc") =>
    dir === "asc" ? (
      <ArrowUp className="size-[1em]" />
    ) : dir === "desc" ? (
      <ArrowDown className="size-[1em]" />
    ) : (
      ""
    );

  const { handleSubmit, reset, control, watch } = useForm({
    defaultValues: { ref: "" },
    mode: "onSubmit",
    resolver: zodResolver(searchPropertySchema),
    resetOptions: { keepValues: true },
  });

  const { data, mutateAsync, isPending, isIdle } = useMutation({
    // ...searchPropertyMutationOptions(watch()),
    mutationFn: searchPropertyFn,
    onMutate: async ({ data }) => {
      reset(data, { keepValues: true });
      await navigate({ to: ".", search: { province: data.province } });
    },
  });

  const provinciasItems = PROVINCIAS.map((o) => ({ label: o, value: o }));

  return (
    <FlexContainer padding="none" spacing="sm">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(async (data) => {
          await mutateAsync({ data });
        })}
      >
        <FieldSet className="*:flex-1 md:flex-row">
          <Field className="max-w-sm">
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
          <Button disabled={isPending} type="submit">
            {isPending ? (
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

      <Table>
        <TableHeader>
          <TableRow className="*:transition-colors *:hover:bg-accent/80">
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "ref",
              })}
              onClick={() => handleSort("ref")}
            >
              <span className="flex items-center gap-1">
                Ref {sortBy === "ref" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "price",
              })}
              onClick={() => handleSort("price")}
            >
              <span className="flex items-center gap-1">
                Price {sortBy === "price" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "town",
              })}
              onClick={() => handleSort("town")}
            >
              <span className="flex items-center gap-1">
                Town {sortBy === "town" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "province",
              })}
              onClick={() => handleSort("province")}
            >
              <span className="flex items-center gap-1">
                Province {sortBy === "province" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead
              className={cn("cursor-pointer", {
                "bg-accent": sortBy === "createdAt",
              })}
              onClick={() => handleSort("createdAt")}
            >
              <span className="flex items-center gap-1">
                Date {sortBy === "createdAt" && arrowDirection(sortOrder)}
              </span>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        {!isIdle &&
          data &&
          (isPending ? (
            <Skeleton className="h-40 w-60" />
          ) : (
            <PropertySearchResultTableBody data={data} />
          ))}
      </Table>
    </FlexContainer>
  );
}
