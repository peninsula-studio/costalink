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
    spacing: {
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
  padding = "md",
  spacing = "md",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(containerVariants({ spacing, padding }), className),
      },
      props,
    ),
    render,
  });
}
