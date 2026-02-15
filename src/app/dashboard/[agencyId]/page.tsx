import { HouseIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography";
import { $getFullOrganization } from "@/lib/fn/organization";

export default async function AgencyPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;

  const activeOrganization = await $getFullOrganization({
    organizationId: agencyId,
  });

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
