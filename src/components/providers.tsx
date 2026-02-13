"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <SidebarProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster closeButton={true} richColors visibleToasts={5} />
        {children}
      </ThemeProvider>
    </SidebarProvider>
  );
}
