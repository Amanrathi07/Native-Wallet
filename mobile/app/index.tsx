import { useAuth, useClerk } from '@clerk/clerk-expo';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  if (!isSignedIn) {
    return null;
  }

  return (
    <View>
      <Text>welcome to you profile</Text>
      <TouchableOpacity  onPress={()=>signOut}>
          <Text>signOut</Text>
      </TouchableOpacity>
    </View>
  );
}