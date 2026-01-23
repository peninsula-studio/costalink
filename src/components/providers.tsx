import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ReactQueryDevtools
        buttonPosition="bottom-right"
        initialIsOpen={false}
        position="bottom"
      />
      <Toaster closeButton={true} richColors visibleToasts={5} />
      {children}
    </ThemeProvider>
  );
};
