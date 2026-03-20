import { mergeProps, useRender } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("flex flex-col", {
  variants: {
    padding: {
      none: "p-0",
      xs: "p-2",
      sm: "p-3 lg:p-4",
      md: "p-4 lg:p-8",
      lg: "p-8 lg:p-12",
    },
    gap: {
      none: "gap-0",
      xs: "gap-3",
      sm: "gap-6",
      md: "gap-10",
      lg: "gap-12",
    },
  },
});

export function FlexContainer({
  className,
  padding = "none",
  gap = "none",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          containerVariants({ gap: gap, padding: padding }),
          className,
        ),
      },
      props,
    ),
    render,
  });
}

export function PageContainer({
  className,
  render,
  ...props
}: useRender.ComponentProps<"main"> & VariantProps<typeof containerVariants>) {
  return useRender({
    defaultTagName: "main",
    props: mergeProps<"main">(
      {
        className: cn("flex flex-col gap-sm p-sm lg:gap-md lg:p-md", className),
      },
      props,
    ),
    render,
  });
}
