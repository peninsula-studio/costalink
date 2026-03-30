import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { honoClient } from "@/lib/hono-client";

export default function Page() {
  const { data: properties } = useQuery({
    queryKey: ["property", "list"],
    queryFn: async () => {
      return [{ id: "alskjdflkajsdf" }];
    },
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.cardGrid}>
          {properties ? (
            properties.map((property) => (
              <Card key={property.id}>
                <CardHeader>
                  <Image
                    contentFit="cover"
                    contentPosition="center"
                    priority="high"
                    source={require("@/assets/images/mobile-hero-image.webp")}
                    style={styles.image}
                  />
                </CardHeader>
                <CardContent>
                  <ThemedText style={styles.cardTitle}>Hello!</ThemedText>
                </CardContent>
              </Card>
            ))
          ) : (
            <ThemedText>Loading...</ThemedText>
          )}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    gap: Spacing.md,
    paddingBottom: BottomTabInset + Spacing.md,
    maxWidth: MaxContentWidth,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardGrid: {
    // flex: 1,
    gap: Spacing.sm,
    // paddingVertical: Spacing.lg,
    // borderRadius: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 600,
  },
});
