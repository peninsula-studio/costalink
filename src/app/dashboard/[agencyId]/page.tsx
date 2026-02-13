"use client";

import { HouseIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAppCtx } from "@/components/app-provider";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography";

export default function AgencyPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = React.use(params);

  const { activeOrganization } = useAppCtx();

  return (
    <>
      <TypographyH3>{activeOrganization.name}</TypographyH3>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link href={`/dashboard/${activeOrganization.id}/property`}>
            <HouseIcon />
            Property
          </Link>
        }
      ></Button>
    </>
  );
}
