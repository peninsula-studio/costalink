import { FlashList } from "@shopify/flash-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Insets, MaxContentWidth, Spacing } from "@/constants/theme";
import { honoClient } from "@/lib/hono-client";

export function OrganizationProperiesList({
  organizationId,
}: {
  organizationId: string;
}) {
  const insets = useSafeAreaInsets();

  const { data: properties } = useSuspenseQuery({
    queryKey: ["property", "list", organizationId],
    queryFn: async () => {
      try {
        const kek = await honoClient.organization[":id"].properties[
          ":pageSize?:page?"
        ].$get({
          param: {
            id: organizationId,
            page: 1,
            pageSize: 10,
          },
        });
        const data = await kek.json();
        return data;
      } catch (e) {
        console.error(`Error getting property list ${e}`);
        throw e;
      }
    },
  });

  // const properties: { id: string; images: { url: string }[] }[] = [];

  return (
    <FlashList
      // automaticallyAdjustContentInsets={true}
      contentContainerStyle={[
        styles.cardGrid,
        { paddingTop: insets.top + Insets.top },
      ]}
      // contentInsetAdjustmentBehavior="always"
      data={properties}
      ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      keyExtractor={(property) => property.id}
      ListEmptyComponent={() => (
        <View>
          <ThemedText>Empty list!</ThemedText>
        </View>
      )}
      persistentScrollbar={false}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  listContainer: {
    flex: 1,
    // paddingTop: Insets.top,
    // paddingHorizontal: Spacing.md,
    // alignItems: "center",
    width: "100%",
    maxWidth: MaxContentWidth,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardGrid: {
    // flex: 1,
    width: "100%",
    // minWidth: "100%",
    // display: "flex",
    // flexDirection: "column",
    // gap: Spacing.sm,
    maxWidth: MaxContentWidth,
    paddingTop: Insets.top,
    // paddingBottom: Insets.bottom,
    paddingHorizontal: Spacing.md,
    // borderRadius: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 600,
  },
});
