import { useSignIn } from "@clerk/expo";
import { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      await setActive!({
        session: result.createdSessionId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
}