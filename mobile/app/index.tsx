import { Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { useAuth } from '@clerk/expo'

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();
  console.log("isSignedIn :",isSignedIn)

  console.log("isLoaded :",isLoaded)

  if(!isLoaded){
    <SafeAreaView>
      <Text>Loading.....</Text>
    </SafeAreaView>
  }

  if(isSignedIn){
    <SafeAreaView>
      <Text>pls signin first </Text>
      <Link href={'/(auth)/sign-in'} >sign in</Link>
    </SafeAreaView>
  }
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home