import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
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
import { toast } from "sonner";
import type { ClassNameValue } from "tailwind-merge";
import { useTheme } from "@/components/theme-provider";
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
import { signOutFn } from "@/lib/fn/auth";
import { userKeys } from "@/lib/fn/keys";
import { cn } from "@/lib/utils";

export function NavUser({ className }: { className?: ClassNameValue }) {
  const { user } = useRouteContext({ from: "/app" })

  const { isMobile } = useSidebar();

  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["signOut"],
    mutationFn: async () => await signOutFn(),
    onError: (error) => {
      console.error(`Sign-out error: ${error.message}`);
      toast.error("Error", {
        description: error.message || "Error while signing out",
      });
    },
    onSuccess: async () => {
      // await router.invalidate();
      await qc.resetQueries({ queryKey: userKeys.session() });
      toast.info("Signed out successfully");
      // router.navigate({ to: "/sign-in" });
      router.history.push("/sign-in");
      return;
    },
  });

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
                  <span className="truncate font-medium">
                    {user.name}
                  </span>
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
                  <span className="truncate font-medium">
                    {user.name}
                  </span>
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
                  <Link to="/app/account">
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
            <DropdownMenuItem onClick={() => mutate()} variant="destructive">
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
