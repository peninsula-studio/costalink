import { useMutation } from "@tanstack/react-query";
import { useRouteContext, useRouter } from "@tanstack/react-router";
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
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

export function NavUser({ className }: { className?: ClassNameValue }) {
  const { isMobile } = useSidebar();

  const { theme, setTheme } = useTheme();

  const { session } = useRouteContext({ from: "/_authed" });

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: ["signOut"],
    mutationFn: async () =>
      await authClient.signOut({
        // query: { callbackURL },
      }),
    onError: (error) => {
      console.error(`Sign-out error: ${error.message}`);
      toast.error("Error", {
        description:
          error.message ||
          "Error al cerrar sesión. Contacte con el adminsitrador.",
      });
    },
    onSuccess: () => {
      toast.info("Sesión cerrada");
      router.navigate({ to: "/sign-in" });
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
                  <AvatarImage alt={session.user.name} />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs">{session.user.email}</span>
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
                  <AvatarImage alt={session.user.name} />
                  <AvatarFallback>
                    <UserIcon className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs">{session.user.email}</span>
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
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
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
                    <Monitor /> Automático
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => await mutateAsync()}
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
