import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  OrganizationPreview,
  OrganizationPreviewSkeleton,
} from "@/components/organization-preview";
import { ThemedText } from "@/components/themed-text";
import { Header, MaxContentWidth, Spacing } from "@/constants/theme";
import { authClient } from "@/lib/auth-client";
import { getListOrganizationsQueryOptions } from "@/lib/queries/organization";

export default function DashboardIndex() {
  const { data: organizationList } = useSuspenseQuery(
    getListOrganizationsQueryOptions(),
  );

  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();

  const activeOrganizationId =
    session?.session.activeOrganizationId ||
    session?.user.defaultOrganizationId;

  if (activeOrganizationId) {
    // router.replace({
    //   pathname: "/(dashboard)/[organizationId]",
    //   params: { organizationId: activeOrganizationId },
    // });
    return (
      <Redirect
        href={{
          pathname: "/(dashboard)/[organizationId]",
          params: { organizationId: activeOrganizationId },
        }}
      />
    );
  }

  // return (
  //   <SafeAreaView>
  //     <ThemedText>Hello!</ThemedText>
  //   </SafeAreaView>
  // );

  return (
    <ScrollView
    // contentContainerStyle={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Link asChild href={{ pathname: "../" }}>
          <ThemedText type="subtitle">User</ThemedText>
        </Link>
        {/* <React.Suspense */}
        {/*   fallback={ */}
        {/*     <> */}
        {/*       <OrganizationPreviewSkeleton /> */}
        {/*       <OrganizationPreviewSkeleton /> */}
        {/*       <OrganizationPreviewSkeleton /> */}
        {/*     </> */}
        {/*   } */}
        {/* > */}
        {/*   {organizationList.map((o) => ( */}
        {/*     <Link */}
        {/*       href={{ */}
        {/*         pathname: "/[organizationId]", */}
        {/*         params: { organizationId: o.id }, */}
        {/*       }} */}
        {/*       key={o.id} */}
        {/*     > */}
        {/*       <OrganizationPreview */}
        {/*         organizationId={o.id} */}
        {/*         organizationSlug={o.slug} */}
        {/*       /> */}
        {/*     </Link> */}
        {/*   ))} */}
        {/* </React.Suspense> */}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    gap: Spacing.lg,
    paddingTop: Header.height,
    maxWidth: MaxContentWidth,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardGrid: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
    overflow: "visible",
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
