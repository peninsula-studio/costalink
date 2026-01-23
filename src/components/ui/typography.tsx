import type * as React from "react";
import { cn } from "@/lib/utils";

function TypographyH1({
  className,
  children,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1 className={cn("font-medium text-6xl", className)} {...props}>
      {children}
    </h1>
  );
}

function TypographyH2({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("font-medium text-5xl", className)} {...props}>
      {children}
    </h2>
  );
}

function TypographyH3({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("font-medium text-4xl", className)} {...props}>
      {children}
    </h3>
  );
}

function TypographyH4({
  className,
  children,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4 className={cn("font-medium text-3xl", className)} {...props}>
      {children}
    </h4>
  );
}

function TypographyH5({
  className,
  children,
  ...props
}: React.ComponentProps<"h5">) {
  return (
    <h5 className={cn("font-medium text-2xl", className)} {...props}>
      {children}
    </h5>
  );
}

function TypographyH6({
  className,
  children,
  ...props
}: React.ComponentProps<"h6">) {
  return (
    <h6 className={cn("font-medium text-xl", className)} {...props}>
      {children}
    </h6>
  );
}

function TypographyLarge({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-medium text-lg", className)} {...props}>
      {children}
    </span>
  );
}

function TypographyP({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-pretty font-normal text-base", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyLarge,
  TypographyP,
};
