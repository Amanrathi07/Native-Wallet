import { useAuth, useClerk } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  if (!isSignedIn) {
    return (
      <View>
        <Text>pls login </Text>
        <Link href={"/Sign-in"}>signin</Link>
      </View>
    );
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