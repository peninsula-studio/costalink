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

import type { LucideProps } from "lucide-react-native";
import * as icons from "lucide-react-native/icons";
import type { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
  themeColor?: ThemeColor;
}

export function ThemedIcon({
  name,
  themeColor,
  strokeWidth = 1.5,
  size = 20,
  color,
  ...props
}: IconProps) {
  const theme = useTheme();
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      color={themeColor ? theme[themeColor] : color}
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
