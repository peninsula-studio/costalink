import { Pressable, type PressableProps, StyleSheet } from "react-native";
import { Colors, type ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  themeColor?: ThemeColor;
};

export function ThemedButton({
  lightColor,
  darkColor,
  variant = "primary",
  children,
  style,
  size = "md",
  ...props
}: ThemedButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedButton,
        variants[variant],
        sizes[size],
        // style,
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
    alignItems: "center",
    justifyContent: "center",
  },
  pressedButton: {
    opacity: 0.7,
  },
});

const sizes = StyleSheet.create({
  sm: {
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  md: {
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  lg: {
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});

const variants = StyleSheet.create({
  primary: {
    backgroundColor: Colors.light.primary,
    color: Colors.light.textPrimary,
  },
  secondary: {
    backgroundColor: Colors.light.secondary,
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
