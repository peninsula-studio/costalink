import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView, type BlurViewProps } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, type ViewProps } from "react-native";
import { easeGradient } from "react-native-easing-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface Props extends ViewProps {
  blurTarget?: BlurViewProps["blurTarget"];
}

export default function GradientMaskedBlurHeader({
  style,
  blurTarget,
  ...props
}: Props) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const tint: React.ComponentProps<typeof BlurView>["tint"] =
    colorScheme === "dark" ? "dark" : "light";

  // Create a smooth gradient mask
  const { colors: blurColors, locations: blurLocations } = easeGradient({
    colorStops: {
      0: { color: "black" },
      0.15: { color: "rgba(0,0,0,0.99)" },
      0.7: { color: "transparent" },
    },
  });

  // Create a smooth gradient mask
  const { colors: gradientColors, locations: gradientLocations } = easeGradient(
    {
      colorStops: {
        0: { color: "rgba(239,240,246,0.3)" },
        0.1: { color: "rgba(239,240,246,0.29)" },
        0.6: { color: "rgba(239,240,246,0)" },
      },
    },
  );

  return (
    <View
      style={{
        flex: 1,
        height: insets.top + 80,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        ...style,
      }}
      {...props}
    >
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        locations={gradientLocations as [number, number, ...number[]]}
        style={StyleSheet.absoluteFill}
      />
      <MaskedView
        maskElement={
          <LinearGradient
            colors={blurColors as [string, string, ...string[]]}
            locations={blurLocations as [number, number, ...number[]]}
            style={StyleSheet.absoluteFill}
          />
        }
        style={StyleSheet.absoluteFill}
      >
        <BlurView
          blurTarget={blurTarget}
          intensity={20}
          style={StyleSheet.absoluteFill}
          tint={tint}
        />
      </MaskedView>
    </View>
  );
}
