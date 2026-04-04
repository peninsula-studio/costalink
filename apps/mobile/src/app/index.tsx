import { authClient } from "@repo/auth/client";
import { getSessionQueryOptions } from "@repo/types/queries/auth";
import { useQuery } from "@tanstack/react-query";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import type React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import { Colors, Spacing, Springs } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function HomeScreen() {
  const theme = useTheme();

  const { data: session } = authClient.useSession();

  // const slideInFromBottom = (v: EntryAnimationsValues): LayoutAnimation => {
  //   "worklet";
  //   const DELAY = 550;
  //   const animations: StyleProps = {
  //     opacity: withDelay(DELAY, withSpring(1, Springs.default)),
  //     transform: [
  //       // { scale: withDelay(DELAY, withSpring(1, Spring.default)) },
  //       { translateY: withDelay(DELAY, withSpring(0, Springs.default)) },
  //     ],
  //   };
  //   const initialValues: StyleProps = {
  //     opacity: 0,
  //     transform: [
  //       // { scale: 0.97 },
  //       { translateY: 15 },
  //     ],
  //   };
  //   return {
  //     initialValues,
  //     animations,
  //   };
  // };

  const baseFadeIn = () =>
    FadeInDown.springify().damping(160).stiffness(200).mass(1.5);

  // const target = React.useRef(null);

  const colors: React.ComponentProps<typeof LinearGradient>["colors"] = [
    "rgba(0,136,255,0)",
    "rgba(0,136,255,0)",
    "rgba(0,136,255,0.15)",
    "rgba(0,136,255,0.25)",
  ];

  const locations: React.ComponentProps<typeof LinearGradient>["locations"] = [
    0, 0.5, 0.75, 1,
  ];

  const bgImage = require("@/assets/images/mobile-hero-image.webp");

  return (
    <View style={styles.container}>
      <ImageBackground style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={colors}
          end={{ x: 1, y: 1 }}
          locations={locations}
          start={{ x: 0.1, y: 0 }}
          style={{ flex: 1 }}
        />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          entering={baseFadeIn()
            .delay(300)
            .withInitialValues({
              opacity: 1,
              transform: [{ translateY: 85 }],
            })}
          style={styles.heroSection}
        >
          <ThemedText>Something goes here</ThemedText>
          <ThemedText>{session?.user.name || "No session"}</ThemedText>
          <ThemedText>
            {session?.session.activeOrganizationId || "No session"}
          </ThemedText>
        </Animated.View>

        <Animated.View
          // entering={slideInFromBottom}
          entering={baseFadeIn().delay(500)}
          style={styles.subheadingSection}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              source={require("@/assets/images/avatar-1.webp")}
              style={{ ...styles.avatar, marginRight: -12 }}
            />
            <Image
              source={require("@/assets/images/avatar-2.webp")}
              style={{ ...styles.avatar, marginRight: -12 }}
            />
            <Image
              source={require("@/assets/images/avatar-3.webp")}
              style={styles.avatar}
            />
          </View>
          <ThemedText
            lineBreakStrategyIOS="push-out"
            style={styles.subheading}
            textBreakStrategy="balanced"
            type="small"
          >
            Join the collaboration platform with 50+ agents and 200+ exclusive
            properties.
          </ThemedText>
        </Animated.View>

        <Animated.View
          entering={baseFadeIn().delay(700)}
          style={styles.buttonSection}
        >
          <Link asChild href={"/sign-in"}>
            <ThemedButton>
              <SymbolView
                name={"chevron.right"}
                size={14}
                tintColor={theme.textPrimary}
                weight="bold"
              />
              <ThemedText themeColor="textPrimary">Sign in</ThemedText>
            </ThemedButton>
          </Link>
          <Link asChild href={"/dashboard"}>
            <ThemedButton variant="secondary">
              <SymbolView
                name={"lock"}
                size={14}
                tintColor={theme.text}
                weight="bold"
              />
              <ThemedText>Protected route</ThemedText>
            </ThemedButton>
          </Link>

          {session && (
            <ThemedButton
              onPress={async () => {
                await authClient.signOut();
              }}
              variant="destructive"
            >
              <SymbolView
                name={"door.right.hand.open"}
                size={14}
                tintColor={theme.destructiveForeground}
                weight="bold"
              />
              <ThemedText themeColor="destructiveForeground">
                Sign out
              </ThemedText>
            </ThemedButton>
          )}
        </Animated.View>
      </SafeAreaView>
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
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: Spacing.sm,
  },
  animatedBottomSection: {
    transformOrigin: "bottom",
    paddingBottom: Spacing.md,
    alignItems: "center",
    gap: Spacing.xxl,
  },
  subheadingSection: {
    alignItems: "center",
    width: "100%",
    gap: Spacing.sm,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: "100%",
  },
  subheading: {
    textAlign: "center",
    flexShrink: 1,
    maxWidth: 300,
    color: Colors.light.text,
  },
  buttonSection: {
    gap: Spacing.sm,
    alignItems: "stretch",
  },
});
