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
    primary: "rgb(0,130,255)",
    textPrimary: "rgb(255,255,255)",
    secondary: "#9ABCCC",
    destructive: "rgba(255,56,60,1)",
    destructiveForeground: "rgba(255,255,255,1)",
  },
  dark: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    primary: "#D8F700",
    textPrimary: "rgb(255,255,255)",
    secondary: "#9ABCCC",
    destructive: "rgba(255,56,60,1)",
    destructiveForeground: "rgba(255,255,255,1)",
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
  xxs: 6,
  xs: 10,
  sm: 16,
  md: 24,
  lg: 34,
  xl: 46,
  xxl: 58,
  xxxl: 64,
} as const;

export const Radius = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 26,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const Springs = {
  default: {
    damping: 160,
    stiffness: 200,
    mass: 1.5,
  },
} as const satisfies { [k: string]: SpringConfig };
