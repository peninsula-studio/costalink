import { Pressable, type PressableProps, StyleSheet } from "react-native";
import { Colors, Spacing, type ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: keyof typeof variants;
  themeColor?: ThemeColor;
};

export function ThemedButton({
  lightColor,
  darkColor,
  variant,
  children,
  style,
  ...props
}: ThemedButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedButton,
        variants[variant || "primary"],
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
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  pressedButton: {
    opacity: 0.7,
  },
});

const variants = StyleSheet.create({
  primary: {
    backgroundColor: Colors.light.primary,
    color: Colors.light.text,
  },
  secondary: {
    backgroundColor: Colors.light.secondary,
    color: Colors.light.text,
  },
  outlined: {
    backgroundColor: Colors.light.background,
    outlineWidth: 1.5,
    outlineOffset: -1.5,
    outlineColor: Colors.light.secondary,
    color: Colors.light.text,
  },
});
