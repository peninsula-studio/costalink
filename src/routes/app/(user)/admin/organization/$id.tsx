import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { Suspense } from "react";
import { toast } from "sonner";
import { FlexContainer } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { TypographyH3 } from "@/components/ui/typography";
import {
  addMemberFn,
  listMembersQueryOptions,
  removeMemberFn,
} from "@/lib/fn/member";
import {
  deleteOrganizationMutationOptions,
  getFullOrganizationQueryOptions,
} from "@/lib/fn/organization";
import { listUsersQueryOptions } from "@/lib/fn/user";

export const Route = createFileRoute("/app/(user)/admin/organization/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <FlexContainer>
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
    </FlexContainer>
  );
}

function OrgData() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();

  const { data: organization } = useSuspenseQuery(
    getFullOrganizationQueryOptions({ organizationId: id }),
  );

  const { mutate } = useMutation({
    ...deleteOrganizationMutationOptions(),
    onError: async (error) => {
      toast.error(`Error deleting Organization`, {
        description: error.message,
      });
    },
    onSuccess: async (data) => {
      toast.success(`Deleted Organization ${data.name}`);
      await navigate({ to: "/app/admin", reloadDocument: true });
    },
  });

  return (
    <ItemGroup className="flex flex-col">
      <Item className="px-0">
        <ItemHeader>
          <ItemTitle className="text-2xl">{organization.name}</ItemTitle>
        </ItemHeader>
        <ItemContent>
          <ItemDescription>Id: {organization.id}</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <ItemActions>
            <Button
              className="w-fit"
              onClick={() => {
                mutate({
                  data: { organizationId: id },
                });
              }}
              variant="destructive"
            >
              <Trash2 data-icon="inline-start" /> Delete Organization
            </Button>
          </ItemActions>
        </ItemFooter>
      </Item>
    </ItemGroup>
  );
}

function UserList() {
  const { id } = Route.useParams();
  const { data: users } = useSuspenseQuery(listUsersQueryOptions());
  const { data: members, refetch } = useSuspenseQuery(
    listMembersQueryOptions({ organizationId: id }),
  );
  return (
    <div className="flex flex-col gap-4">
      <TypographyH3>Members:</TypographyH3>
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
                        organizationId: id,
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
                        organizationId: id,
                      },
                    });
                    if (member) {
                      toast.info(`Successfully removed ${user.name} from Org`);
                      refetch();
                    }
                  }}
                  variant="destructive"
                >
                  <MinusIcon data-icon="inline-start" /> Remove from Org
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
