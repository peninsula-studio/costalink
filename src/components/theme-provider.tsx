import { useRouter } from "@tanstack/react-router";
import {
  createContext,
  type PropsWithChildren,
  use,
  useEffect,
  useEffectEvent,
} from "react";
import { setThemeServerFn, type Theme } from "@/lib/fn/theme";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren<{ theme: Theme }>;

const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({ children, theme }: Props) {
  const router = useRouter();

  function setTheme(val: Theme) {
    setThemeServerFn({ data: val }).then(() => router.invalidate());
  }

  const preferMediaToggle = useEffectEvent(async (theme: Theme) => {
    const shouldToggleDarkMode =
      theme !== "light" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.classList.toggle("dark", shouldToggleDarkMode);
  });

  useEffect(() => {
    preferMediaToggle(theme);
  }, [theme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const val = use(ThemeContext);
  if (!val) throw new Error("useTheme called outside of ThemeProvider!");
  return val;
}
