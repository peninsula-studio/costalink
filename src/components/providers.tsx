import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProvider } from "@/components/app-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
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
