/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";
import type { SpringConfig } from "react-native-reanimated/src/animation/spring";

export const Colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    primary: "#D8F700",
    secondary: "#9ABCCC",
  },
  dark: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    primary: "#D8F700",
    secondary: "#9ABCCC",
  },
  // dark: {
  //   text: "#ffffff",
  //   background: "#000000",
  //   backgroundElement: "#212225",
  //   backgroundSelected: "#2E3135",
  //   textSecondary: "#B0B4BA",
  //   primary: "#D8F700",
  //   secondary: "#9ABCCC",
  // },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  xs: 5,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const Spring = {
  default: {
    damping: 130,
  },
} as const satisfies { [k: string]: SpringConfig };
