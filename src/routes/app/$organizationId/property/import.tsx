import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckIcon,
  CircleIcon,
  FileXCorner,
  ImportIcon,
  XIcon,
} from "lucide-react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageContainer } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ItemGroup } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH2 } from "@/components/ui/typography";
import type { kyeroPropertySchema } from "@/lib/fn/kyero/schemas";
import {
  createPropertyMutationOptions,
  extractPropertiesFromKyeroXMLFn,
} from "@/lib/fn/property";
import { formatPrice } from "@/lib/i18n/format";

export const Route = createFileRoute("/app/$organizationId/property/import")({
  component: RouteComponent,
});

function RouteComponent() {
  const importKyeroXMLSchema = z.object({
    url: z.url(),
  });

  const { formState, register, getValues, reset, handleSubmit } = useForm({
    defaultValues: {
      // WARNING: Don't build with this value
      // url: "https://feeds.kyero.com/assets/kyero_v3_test_feed.xml",
      // url: "https://www.vandamestates.com/kyero/direct",
    },
    mode: "onSubmit",
    resolver: zodResolver(importKyeroXMLSchema),
  });

  const { data, refetch, isFetching, isSuccess, isError } = useQuery({
    queryKey: ["kyeroXML", getValues("url")],
    queryFn: async () =>
      await extractPropertiesFromKyeroXMLFn({
        data: { url: getValues("url") },
      }),
    enabled: false,
  });

  return (
    <PageContainer>
      <TypographyH2>Import properties from Kyero XML</TypographyH2>
      <form
        name="Import Kyero XML form"
        onSubmit={handleSubmit(async () => {
          reset(undefined, { keepValues: true });
          await refetch();
        })}
      >
        <FieldSet>
          <Field className="max-w-2xl" data-invalid={!!formState.errors.url}>
            <FieldContent>
              <FieldLabel htmlFor="kyero-feed-url">Kyero feed URL</FieldLabel>
              <Input
                aria-invalid={!!formState.errors.url}
                id="url"
                placeholder="https://www.website.com/feed/kyero-v3.xml"
                type="url"
                {...register("url")}
              />
              <FieldError errors={[formState.errors.url]} />
            </FieldContent>
          </Field>
          <Field className="w-fit">
            <Button
              disabled={isFetching || isSuccess}
              type="submit"
              variant={
                isFetching
                  ? "secondary"
                  : isError
                    ? "destructive"
                    : isSuccess
                      ? "success"
                      : "default"
              }
            >
              {isFetching ? (
                <>
                  <Spinner data-icon="inline-start" /> Fetching
                </>
              ) : isError ? (
                <>
                  <XIcon data-icon="inline-start" /> Error fetching XML
                </>
              ) : isSuccess ? (
                <>
                  <CheckIcon data-icon="inline-start" /> Fetched URL
                </>
              ) : (
                <>
                  <ImportIcon /> Fetch from URL
                </>
              )}
            </Button>
          </Field>
        </FieldSet>
      </form>

      {(formState.isSubmitting || formState.isSubmitted) && (
        <Suspense fallback={<Skeleton className="h-12 w-full max-w-2xl" />}>
          <XMLFetchPreview data={data} />
        </Suspense>
      )}
    </PageContainer>
  );
}

function XMLFetchPreview({
  data,
}: {
  data?: z.infer<typeof kyeroPropertySchema>[];
}) {
  const { mutateAsync, isPending, isError, isSuccess } = useMutation(
    createPropertyMutationOptions(),
  );

  const [importProgress, setImportProgress] = useState(0);

  return data ? (
    <div className="flex flex-col gap-sm">
      {data.length > 0 ? (
        <>
          <Button
            className="w-fit"
            disabled={isPending || isSuccess}
            onClick={async () => {
              const promises = data.map((p) =>
                mutateAsync(p).then(() =>
                  setImportProgress((v) => v + 1 / data.length),
                ),
              );

              await Promise.all(promises);
            }}
            type="submit"
            variant={
              isError ? "destructive" : isSuccess ? "success" : "default"
            }
          >
            {isPending ? (
              <>
                <Spinner data-icon="inline-start" /> Progress {importProgress} %
              </>
            ) : isError ? (
              <>
                <XIcon data-icon="inline-start" /> Error importing properties
              </>
            ) : isSuccess ? (
              <>
                <CheckIcon data-icon="inline-start" /> Imported {data.length}{" "}
                properties
              </>
            ) : (
              <>Import {data.length} properties</>
            )}
          </Button>
          <ItemGroup
            // className="flex-row flex-wrap"
            className="grid grid-cols-[repeat(auto-fill,minmax(12rem,auto))] gap-xs lg:gap-sm"
          >
            {data.map((property) => (
              <Card
                className="relative w-full max-w-xs pt-0 transition-transform hover:scale-101"
                key={property.ref}
              >
                <div
                  aria-hidden="true"
                  className="group absolute z-10 flex size-full justify-end rounded-lg p-2 outline-3 outline-transparent -outline-offset-3 transition-colors hover:outline-primary/20 data-[selected=true]:outline-primary"
                  data-selected={true}
                >
                  <CircleIcon className="size-5 fill-background stroke-1 stroke-foreground group-data-selected:fill-primary" />
                </div>
                <CardHeader className="w-full px-0">
                  <img
                    alt={property.images[0].id}
                    className="aspect-video w-full object-cover object-center"
                    src={property.images[0].url}
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="flex justify-between pb-2 text-base">
                    <span>{property.ref}</span>
                    <Badge className="font-medium" variant="default">
                      {formatPrice(property.price, property.currency, "es")}
                      &nbsp;
                    </Badge>
                  </CardTitle>
                  <pre className="max-h-44 overflow-scroll rounded-sm border border-border bg-secondary">
                    {JSON.stringify(property, null, 2)}
                  </pre>
                  <span>{property.province}</span>
                </CardContent>
              </Card>
            ))}
          </ItemGroup>
        </>
      ) : (
        <Empty className="max-w-xl self-center border bg-muted">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileXCorner className="size-6" />
            </EmptyMedia>
            <EmptyTitle className="text-base">URL is empty</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <EmptyDescription>
              There are no properties in the provided URL
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      )}
    </div>
  ) : (
    <Empty className="mx-auto w-fit">
      <EmptyContent>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileXCorner />
          </EmptyMedia>
          <EmptyTitle>No data in that URL!</EmptyTitle>
        </EmptyHeader>
      </EmptyContent>
    </Empty>
  );
}
