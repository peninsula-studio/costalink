import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography";
import { authClient } from "@/lib/auth/client";
import {
  addMemberFn,
  listMembersQueryOptions,
  removeMemberFn,
} from "@/lib/fn/member";
import { getFullOrganizationQueryOptions } from "@/lib/fn/organization";
import { listUsersQueryOptions } from "@/lib/fn/user";

export const Route = createFileRoute(
  "/_authed/dashboard/admin/organization/$organizationId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="bg-emerald-200">LOADING ORGANIZATION DATA</div>
        }
      >
        <OrgData />
      </Suspense>
      <Suspense fallback={<div className="bg-sky-200">LOADING Users list</div>}>
        <UserList />
      </Suspense>
    </main>
  );
}

function OrgData() {
  const { organizationId } = Route.useParams();
  const { data: organization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId }),
  );
  return <div>Organization with ID: {organization?.id}</div>;
}

function UserList() {
  const { organizationId } = Route.useParams();
  const { data: users } = useSuspenseQuery(listUsersQueryOptions());
  const { data: members, refetch } = useSuspenseQuery(
    listMembersQueryOptions({ organizationId }),
  );
  return (
    <section className="flex flex-col gap-4">
      <TypographyH3>Add members:</TypographyH3>
      <div className="flex flex-wrap gap-2">
        {users.users.map((user) => (
          <Card className="w-full max-w-sm" key={user.id}>
            <CardHeader>{user.name}</CardHeader>
            <CardContent>
              <div>{user.id}</div>
              <div>{user.email}</div>
            </CardContent>
            <CardFooter className="space-x-1">
              {!members.members.find((m) => m.userId === user.id) && (
                <Button
                  onClick={async () => {
                    const member = await addMemberFn({
                      data: {
                        organizationId: organizationId,
                        role: "member",
                        userId: user.id,
                      },
                    });
                    if (member) {
                      toast.info(`Successfully added ${user.name} from Org`);
                      refetch();
                    }
                  }}
                >
                  <PlusIcon /> Add to Org
                </Button>
              )}
              {members.members.find((m) => m.userId === user.id) && (
                <Button
                  onClick={async () => {
                    const member = await removeMemberFn({
                      data: {
                        memberIdOrEmail: user.email,
                        organizationId: organizationId,
                      },
                    });
                    if (member) {
                      toast.info(`Successfully removed ${user.name} from Org`);
                      refetch();
                    }
                  }}
                  variant="destructive"
                >
                  <MinusIcon /> Remove from Org
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
