import { useSignIn } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return;

          router.replace(decorateUrl("/") as Href);
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.input}
      />

      {errors?.fields?.identifier ? (
        <Text style={styles.error}>
          {errors.fields.identifier.message}
        </Text>
      ) : null}

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {errors?.fields?.password ? (
        <Text style={styles.error}>
          {errors.fields.password.message}
        </Text>
      ) : null}

      <Pressable
        onPress={handleSubmit}
        disabled={fetchStatus === "fetching"}
        style={styles.button}
      >
        {fetchStatus === "fetching" ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </Pressable>

      <Link href="/sign-up" asChild>
        <Pressable>
          <Text style={styles.link}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 32,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "600",
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
});