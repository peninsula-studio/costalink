import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster closeButton={true} richColors visibleToasts={5} />
        {children}
      </ThemeProvider>
    </SidebarProvider>
  );
}
