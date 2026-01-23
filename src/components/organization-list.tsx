import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserOrganizationQuery } from "@/data/organization/get-user-organizations-client";

export function OrganizationList({ userId }: { userId: string }) {
  const { data: organizationList } = useUserOrganizationQuery(userId);

  return (
    <div className="flex flex-col gap-y-4">
      {organizationList?.map((org) => (
        <Link
          className="w-full max-w-md"
          key={`org-${org.id}`}
          params={{ tenant: "org.slug" }}
          to={`/s/$tenant`}
        >
          <Card>
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
              <CardDescription>{org.slug}</CardDescription>
            </CardHeader>
            <CardContent>Cosas aquí</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
