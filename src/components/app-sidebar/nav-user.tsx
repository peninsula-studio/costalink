"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Monitor,
  MoonIcon,
  Palette,
  Sparkles,
  SunIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import type { ClassNameValue } from "tailwind-merge";
import { useAppCtx } from "@/components/app-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

export function NavUser({ className }: { className?: ClassNameValue }) {
  const { isMobile } = useSidebar();

  const { user } = useAppCtx();

  const { theme, setTheme } = useTheme();

  // const { data: session } = useSuspenseQuery({
  //   queryKey: userKeys.session(),
  //   queryFn: async () => await authClient.getSession(),
  // });

  const navigation = useRouter();

  // const { mutate } = useMutation({
  //   mutationKey: ["signOut"],
  //   mutationFn: async () => await authClient.signOut(),
  //   onError: (error) => {
  //     console.error(`Sign-out error: ${error.message}`);
  //     toast.error("Error", {
  //       description: error.message || "Error while signing out",
  //     });
  //   },
  //   onSuccess: async () => {
  //     // await router.invalidate();
  //     toast.info("Signed out successfully");
  //     navigation.push("/sign-in");
  //     // router.history.push("/sign-in");
  //     return;
  //   },
  // });

  // const { data: session } = authClient.useSession();
  // const user = session?.user;

  // if (!session) return null;
  // const user = session.user;

  return (
    <SidebarMenu className={cn(className)}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                size="lg"
              >
                <Avatar>
                  <AvatarImage alt={user.name} />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            }
          />

          <DropdownMenuContent
            align={isMobile ? "center" : "start"}
            className="w-(--anchor-width) min-w-56 rounded"
            side={isMobile ? "bottom" : "left"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex items-center gap-2 font-light text-sm">
                <Avatar>
                  <AvatarImage alt={user.name} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link href="/app/account">
                    <BadgeCheck />
                    Account
                  </Link>
                }
              ></DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Palette />
                  Apariencia
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={0}>
                  <DropdownMenuItem
                    aria-selected={theme === "light"}
                    onClick={() => {
                      setTheme("light");
                    }}
                  >
                    <SunIcon /> Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    aria-selected={theme === "dark"}
                    onClick={() => setTheme("dark")}
                  >
                    <MoonIcon /> Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    aria-selected={theme === "system"}
                    onClick={() => setTheme("system")}
                  >
                    <Monitor /> Auto
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await authClient.signOut();
                toast.info("Signed out successfully");
                navigation.push("/sign-in");
              }}
              variant="destructive"
            >
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
