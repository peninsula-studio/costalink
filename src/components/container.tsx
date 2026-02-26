import { mergeProps, useRender } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("flex", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    spacing: {
      sm: "gap-x-2 gap-y-4 p-4",
      md: "gap-x-4 gap-y-8 p-8",
      lg: "gap-x-8 gap-y-12 p-12",
    },
  },
});

export function FlexContainer({
  className,
  direction = "vertical",
  // padding = "md",
  spacing = "md",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(containerVariants({ direction, spacing }), className),
      },
      props,
    ),
    render,
  });
}
