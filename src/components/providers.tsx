import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Theme } from "@/lib/fn/theme";

type Props = {
  children: React.ReactNode;
  theme: Theme;
};

export const Providers = ({ children, theme }: Props) => {
  return (
    <SidebarProvider>
      <ReactQueryDevtools
        buttonPosition="bottom-right"
        initialIsOpen={false}
        position="bottom"
      />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster closeButton={true} richColors visibleToasts={5} />
        {children}
      </ThemeProvider>
    </SidebarProvider>
  );
};
