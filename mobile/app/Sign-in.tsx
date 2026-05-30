import { useSignIn } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({
        session: result.createdSessionId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
}