import { HouseIcon } from "lucide-react";
import Link from "next/link";
import { useAppCtx } from "@/components/app-provider";
import { Button } from "@/components/ui/button";
import { TypographyLarge } from "@/components/ui/typography";
import { $getFullOrganization } from "@/lib/fn/organization";

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  // const { activeOrganization } = useAppCtx();

  const fullOrganization = await $getFullOrganization({
    organizationId: agencyId,
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
