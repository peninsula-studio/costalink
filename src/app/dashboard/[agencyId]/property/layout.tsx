import type React from "react";
import { TypographyLarge } from "@/components/ui/typography";

export default async function PropertiesPage({
  params,
  children,
}: {
  params: Promise<{ agencyId: string }>;
  children: React.ReactNode;
}) {
  return (
    <>
      <TypographyLarge>Properites</TypographyLarge>
      {children}
    </>
  );
}
