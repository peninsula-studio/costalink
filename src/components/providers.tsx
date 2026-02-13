"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getQueryClient } from "@/lib/get-query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <SidebarProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster closeButton={true} richColors visibleToasts={5} />
            {children}
            <ReactQueryDevtools
              buttonPosition="bottom-right"
              initialIsOpen={false}
              position="bottom"
            />
          </ThemeProvider>
        </SidebarProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
