import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Screen } from "react-native-screens";
import { useAuthContext } from "@/components/auth-provider";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedButton } from "@/components/ui/themed-button";
import { Colors, MaxContentWidth, Radius, Spacing } from "@/constants/theme";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const { setSession } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const kek = await authClient.signIn.email({
      email,
      password,
    });
    if (kek.data) {
      const sess = await authClient.getSession();
      setSession(sess.data);
      console.log(kek.data);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.formContainer}>
          <TextInput
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.textInput}
            value={email}
          />
          <TextInput
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.textInput}
            value={password}
          />
        </View>
        <ThemedButton onPress={handleLogin} variant="primary">
          <ThemedText>Sign In</ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    gap: Spacing.sm,
    position: "relative",
    flexDirection: "column",
    // paddingHorizontal: Spacing.lg,
  },
  textInput: {
    // borderWidth: 1,
    // bord:-1,
    maxWidth: MaxContentWidth,
    // fontSize: 16,
    outlineColor: Colors.light.textSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.xs,
    backgroundColor: Colors.light.backgroundElement,
  },
});
