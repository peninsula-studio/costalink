// import { SymbolView, type SymbolViewProps } from "expo-symbols";
// import type { ThemeColor } from "@/constants/theme";
//
// export type ThemedViewProps = SymbolViewProps & {
//   themeColor?: ThemeColor;
// };
//
// export function ThemedSymbolView({
//   themeColor,
//   tintColor,
//   ...props
// }: ThemedViewProps) {
//   const theme = useTheme();
//
//   return (
//     <SymbolView
//       tintColor={themeColor ? theme[themeColor] : tintColor}
//       {...props}
//     />
//   );
// }

import * as icons from "lucide-react-native/icons";
import type { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

interface IconProps {
  name: keyof typeof icons;
  themeColor?: ThemeColor;
  size?: number;
}

export function ThemedIcon({ name, themeColor, size }: IconProps) {
  const theme = useTheme();
  const LucideIcon = icons[name];

  return <LucideIcon color={themeColor && theme[themeColor]} size={size} />;
}
