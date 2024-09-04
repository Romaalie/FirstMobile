import { Stack } from 'expo-router'


const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      
      {/* instead of a NavigationContainer in App.js, nested stacks for navigation in T5 are created here*/}
      <Stack.Screen name="T5LaskinHistoriallaLaskin" options={{ headerTitle: 'Calculator' }} />
      <Stack.Screen name="T5LaskinHistoriallaHistoria" options={{ headerTitle: 'History' }} />
    </Stack>

  )
}

export default RootLayout