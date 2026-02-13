"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { HouseIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography";
import { getFullOrganizationQueryOptions } from "@/lib/fn/query-options";

export function OrgInfo({ agencyId }: { agencyId: string }) {
  const { data: activeOrganization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId: agencyId }),
  );

  return (
    <>
      <TypographyH3>{activeOrganization?.name}</TypographyH3>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link href={`/dashboard/${activeOrganization?.id}/property`}>
            <HouseIcon />
            Property
          </Link>
        }
      ></Button>
    </>
  );
}
