import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";

export function TabScreenSkeleton() {
  return (
    <SafeAreaView style={styles.fallbackContainer}>
      <ThemedText>Loading /[organizationId]...</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: 120,
  },
});
