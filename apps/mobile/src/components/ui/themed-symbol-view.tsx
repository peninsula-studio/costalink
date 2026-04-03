import { SymbolView, type SymbolViewProps } from "expo-symbols";
import type { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedViewProps = SymbolViewProps & {
  themeColor?: ThemeColor;
};

export function ThemedSymbolView({
  themeColor,
  tintColor,
  ...props
}: ThemedViewProps) {
  const theme = useTheme();

  return (
    <SymbolView
      tintColor={themeColor ? theme[themeColor] : tintColor}
      {...props}
    />
  );
}
