import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SidebarProvider>
      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools
            buttonPosition="bottom-right"
            initialIsOpen={false}
            position="bottom"
          />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster closeButton={true} richColors visibleToasts={5} />
        {children}
      </ThemeProvider>
    </SidebarProvider>
  );
};
