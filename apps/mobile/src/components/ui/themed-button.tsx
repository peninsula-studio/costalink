import type { ComponentProps } from "react";
import { Pressable, type PressableProps, StyleSheet } from "react-native";
import { Colors, type ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedButtonProps = ComponentProps<typeof Pressable> & {
  lightColor?: string;
  darkColor?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  themeColor?: ThemeColor;
  raised?: boolean;
};

export function ThemedButton({
  lightColor,
  darkColor,
  variant = "primary",
  children,
  raised = false,
  style,
  size = "md",
  ...props
}: ThemedButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={({ pressed, hovered }) => [
        styles.button,
        pressed && styles.pressedButton,
        variants[variant],
        raised && styles.raised,
        sizes[size],
        typeof style === "function" && style({ pressed, hovered }),
        typeof style === "object" && style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
  },
  pressedButton: {
    opacity: 0.7,
  },
  raised: {
    boxShadow:
      "1px 1px 0px 0px rgba(0,0,0,0.1), -1px -1px 0px rgba(0,0,0,0.03), -1px 0px 0px rgba(0,0,0,0.03)",
    // "0px 1px 0px 0px rgba(255,255,255,0.6), -1px 0px 0px rgba(255,255,255,0.6), 1px 0px 0px rgba(255,255,255,0.6), 0px -1px 0px rgba(255,255,255,0.15)",
  },
});

const sizes = StyleSheet.create({
  xs: {
    gap: 3,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  xsIcon: {
    padding: 6,
  },
  sm: {
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  smIcon: {
    padding: 8,
  },
  md: {
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  mdIcon: {
    padding: 12,
  },
  lg: {
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});

const variants = StyleSheet.create({
  none: {},
  primary: {
    backgroundColor: Colors.light.primary,
    color: Colors.light.textPrimary,
  },
  secondary: {
    backgroundColor: Colors.light.secondary,
    color: Colors.light.text,
  },
  glass: {
    backgroundColor: "white",
    color: Colors.light.text,
  },
  destructive: {
    backgroundColor: Colors.light.destructive,
    color: Colors.light.destructiveForeground,
  },
  outlined: {
    backgroundColor: "rgba(255,255,255,0.3)",
    outlineWidth: 1.5,
    outlineOffset: -1.5,
    outlineColor: Colors.light.secondary,
    color: Colors.light.text,
  },
});
