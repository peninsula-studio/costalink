import { StyleSheet, View, type ViewProps } from "react-native";
import Animated from "react-native-reanimated";
import { Colors, Radius, Spacing } from "@/constants/theme";

export function Card({ style, children, ...props }: ViewProps) {
  return (
    <Animated.View style={[styles.card, style]} {...props}>
      {children}
    </Animated.View>
  );
}

export function CardHeader({ style, children, ...props }: ViewProps) {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
}

export function CardContent({ style, children, ...props }: ViewProps) {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    gap: Spacing.xs,
    backgroundColor: Colors.light.secondary,
    overflow: "hidden",
  },
  cardHeader: {
    width: "100%",
    height: "auto",
    aspectRatio: "16/10",
  },
  cardContent: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
    gap: Spacing.xs,
  },
});
