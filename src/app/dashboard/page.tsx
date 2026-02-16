import { Building2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { $getSession } from "@/lib/fn/auth";
import { $getListOrganizations } from "@/lib/fn/organization";

export default async function DashboardPage() {
  const session = await $getSession();

  if (!session) redirect("/sign-in");

  const listOrganizations = await $getListOrganizations();

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <h1 className="font-extrabold text-5xl tracking-tight">DASHBOARD</h1>

      <div className="flex w-fit gap-4">
        {listOrganizations.map((o, i) => (
          <Button
            key={o.id}
            nativeButton={false}
            render={
              <Link href={`/dashboard/${o.id}`}>
                <Building2 /> {o.name}
              </Link>
            }
          ></Button>
        ))}
      </div>
    </main>
  );
}
