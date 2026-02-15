import { HouseIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/components/ui/typography";
import { $getFullOrganization } from "@/lib/fn/organization";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;

  const reqHeaders = await headers();

  const fullOrganization = await $getFullOrganization({
    organizationId: agencyId,
    headers: reqHeaders,
  });

  return (
    <>
      <TypographyLarge>Properites</TypographyLarge>
      <Button
        className="w-fit"
        nativeButton={false}
        render={
          <Link href={`/dashboard/${fullOrganization.id}`}>
            <HouseIcon />
            Property list
          </Link>
        }
      ></Button>
    </>
  );
}
