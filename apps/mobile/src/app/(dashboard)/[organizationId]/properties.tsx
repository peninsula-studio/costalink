import { LegendList } from "@legendapp/list";
import { FlashList } from "@shopify/flash-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BottomTabInset,
  Header,
  Insets,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { honoClient } from "@/lib/hono-client";
import { getSessionQueryOptions } from "@/lib/queries/auth";

export default function Page() {
  const { organizationId } = useGlobalSearchParams<{
    organizationId: string;
  }>();
  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <PropertyList />
        </React.Suspense>
      </View>
    </View>
  );
}

function PropertyList() {
  const { organizationId } = useGlobalSearchParams<{
    organizationId: string;
  }>();
  const { data: session } = useSuspenseQuery(getSessionQueryOptions());

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
    <LegendList
      // automaticallyAdjustContentInsets={true}
      contentContainerStyle={styles.cardGrid}
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
      recycleItems
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
  safeArea: {
    flex: 1,
    // paddingTop: Header.height,
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
    paddingBottom: Insets.bottom,
    paddingHorizontal: Spacing.md,
    // borderRadius: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 600,
  },
});
