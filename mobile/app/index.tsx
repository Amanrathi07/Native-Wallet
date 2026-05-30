import { useAuth } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';

export default function Home() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return null;
  }

  return (
    <View>
      <Text>welcome to you profile</Text>
    </View>
  );
}