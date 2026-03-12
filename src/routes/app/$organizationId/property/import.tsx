import { zodResolver } from "@hookform/resolvers/zod";
import {
  useIsFetching,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CheckIcon, FileXCorner, HouseIcon, ImportIcon } from "lucide-react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FlexContainer } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH2, TypographyLarge } from "@/components/ui/typography";
import {
  createPropertyMutationOptions,
  extractPropertiesFromKyeroXMLFn,
} from "@/lib/fn/property";

export const Route = createFileRoute("/app/$organizationId/property/import")({
  component: RouteComponent,
});

function RouteComponent() {
  const importKyeroXMLSchema = z.object({
    url: z.string(),
  });

  const { formState, register, watch, reset, handleSubmit } = useForm({
    defaultValues: {
      // biome-error: THIS IS TESTING
      // ERROR: Don't build with this value
      // url: "https://feeds.kyero.com/assets/kyero_v3_test_feed.xml",
      url: "https://www.vandamestates.com/kyero/direct",
    },
    mode: "onSubmit",
    resolver: zodResolver(importKyeroXMLSchema),
  });

  watch(() => {
    reset(undefined, {
      keepIsSubmitted: false,
      keepValues: true,
      keepIsSubmitSuccessful: false,
    });
  });

  const isFetching = useIsFetching({
    fetchStatus: "fetching",
    queryKey: ["kyeroXML"],
  });

  return (
    <FlexContainer>
      <TypographyH2>Import properties from Kyero XML</TypographyH2>
      <form
        name="Import Kyero XML form"
        onSubmit={handleSubmit(() => reset(undefined, { keepValues: true }))}
        // onSubmit={handleSubmit(async (data) => {
        //   mutate(data);
        // })}
      >
        <FieldSet>
          <Field className="max-w-2xl">
            <FieldContent>
              <FieldLabel htmlFor="kyero-feed-url">Kyero feed URL</FieldLabel>
              <Input
                id="url"
                placeholder="https://www.website.com/feed/kyero-v3.xml"
                type="url"
                {...register("url")}
              />
            </FieldContent>
          </Field>
          <Field className="w-fit">
            <Button
              disabled={!!isFetching}
              type="submit"
              variant={
                formState.isSubmitted
                  ? isFetching
                    ? "secondary"
                    : "success"
                  : "default"
              }
            >
              {isFetching ? (
                <>
                  <Spinner /> Loading
                </>
              ) : formState.isSubmitted ? (
                <>
                  <CheckIcon /> Imported
                </>
              ) : (
                <>
                  <ImportIcon /> Import
                </>
              )}
            </Button>
          </Field>
        </FieldSet>
      </form>

      {(formState.isSubmitting || formState.isSubmitted) && (
        <Suspense fallback={<Skeleton className="h-12 w-full max-w-2xl" />}>
          <Results url={watch("url")} />
        </Suspense>
      )}
    </FlexContainer>
  );
}

function Results({ url }: { url: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["kyeroXML", url],
    queryFn: async () =>
      await extractPropertiesFromKyeroXMLFn({ data: { url } }),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync, isPending, isError } = useMutation(
    createPropertyMutationOptions(),
  );

  return data ? (
    <FlexContainer padding="none">
      <Button
        className="w-fit"
        disabled={isPending}
        onClick={async () => {
          await Promise.all(data.map((p) => mutateAsync(p)));
        }}
        type="submit"
        variant={isError ? "destructive" : "default"}
      >
        {isPending ? (
          <>
            <Spinner /> Importing
          </>
        ) : isError ? (
          <>Error importing</>
        ) : (
          <>Import {data.length} properties</>
        )}
      </Button>
      <FlexContainer className="flex-row flex-wrap" padding="none">
        {data.map((property) => (
          <Card className="w-full min-w-sm max-w-lg" key={property.ref}>
            <CardHeader>
              <TypographyLarge className="inline-flex">
                <HouseIcon /> {property.ref}
              </TypographyLarge>
            </CardHeader>
            <CardContent>
              <TypographyLarge>
                {Number(property.price).toLocaleString()}&nbsp;
                {property.currency}
              </TypographyLarge>
              <pre>{JSON.stringify(property, null, 2)}</pre>
              {/* <div className="grid grid-cols-3 gap-4"> */}
              {/*   {property.images?.slice(0, 6).map((img) => ( */}
              {/*     <img */}
              {/*       alt={`Element ${img.id}`} */}
              {/*       className="aspect-square w-full min-w-28 max-w-64" */}
              {/*       key={img.id} */}
              {/*       src={img.url} */}
              {/*     /> */}
              {/*   ))} */}
              {/* </div> */}
              <span>{property.province}</span>
            </CardContent>
          </Card>
        ))}
      </FlexContainer>
    </FlexContainer>
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
