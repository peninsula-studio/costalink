import { honoClient } from "@repo/types/lib/hono-client";
import { getSessionQueryOptions } from "@repo/types/queries/auth";
import { FlashList } from "@shopify/flash-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MaxContentWidth, Spacing } from "@/constants/theme";

export default function Page() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <PropertyList />
        </React.Suspense>
      </SafeAreaView>
    </View>
  );
}

function PropertyList() {
  // const { data: session } = authClient.useSession();
  const { data: session } = useSuspenseQuery(getSessionQueryOptions());
  const { data: properties } = useSuspenseQuery({
    queryKey: ["property", "list"],
    queryFn: async () => {
      const kek = await honoClient.organization[":id"].properties[
        ":pageSize?:page?"
      ].$get({
        param: {
          id: session?.session.activeOrganizationId,
          page: 1,
          pageSize: 10,
        },
      });
      const data = await kek.json();
      // return [{ id: "alksdjlfjk" }, sess?.session || { id: "ioweiro" }];
      return data;
    },
  });
  return (
    <View style={styles.cardGrid}>
      <FlashList
        data={properties}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        keyExtractor={(property) => property.id}
        renderItem={({ item }) => (
          <Card>
            <CardHeader>
              <Image
                contentFit="cover"
                contentPosition="center"
                priority="high"
                // source={require("@/assets/images/mobile-hero-image.webp")}
                source={
                  item.images?.[0].url ||
                  require("@/assets/images/mobile-hero-image.webp")
                }
                style={styles.image}
              />
            </CardHeader>
            <CardContent>
              <ThemedText style={styles.cardTitle}>{item.id}</ThemedText>
            </CardContent>
          </Card>
        )}
      />
    </View>
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
    paddingHorizontal: Spacing.md,
    alignItems: "center",
    width: "100%",
    maxWidth: MaxContentWidth,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardGrid: {
    flex: 1,
    width: "100%",
    // minWidth: "100%",
    // display: "flex",
    // flexDirection: "column",
    gap: Spacing.sm,
    maxWidth: MaxContentWidth,
    // paddingVertical: Spacing.lg,
    // borderRadius: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 600,
  },
});
