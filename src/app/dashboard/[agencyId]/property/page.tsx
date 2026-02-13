"use client";

import { HouseIcon } from "lucide-react";
import Link from "next/link";
import { useAppCtx } from "@/components/app-provider";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/components/ui/typography";

export default function PropertiesPage() {
  const { activeOrganization } = useAppCtx();

  return (
    <>
      <TypographyLarge>Properites</TypographyLarge>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link href={`/dashboard/${activeOrganization.id}`}>
            <HouseIcon />
            Property list
          </Link>
        }
      ></Button>
    </>
  );
}
