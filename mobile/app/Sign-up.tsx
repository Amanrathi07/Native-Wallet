import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function SignUpPage() {
  const { signUp, isLoaded } = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Sign Up" onPress={onSignUp} />
    </View>
  );
}