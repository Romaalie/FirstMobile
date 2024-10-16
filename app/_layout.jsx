import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'


const RootLayout = () => {
  return (
    <PaperProvider>
      <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* instead of a NavigationContainer in App.js, nested stacks for navigation in T5 are created here*/}
          <Stack.Screen name="T5LaskinHistoriallaLaskin" options={{ headerTitle: 'Calculator' }} />
          <Stack.Screen name="T5LaskinHistoriallaHistoria" options={{ headerTitle: 'History' }} />

          {/* for T16 navigation*/}
          <Stack.Screen name="T16OsoitekirjaMyPlaces" options={{ headerTitle: 'My Places'}} />
          <Stack.Screen name="T16OsoitekirjaMap" options={{ headerTitle: 'Map'}} />

      </Stack>
    </PaperProvider>
  )
}

export default RootLayout