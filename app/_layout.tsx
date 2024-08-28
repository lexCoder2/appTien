import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { Stack } from 'expo-router'
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Tienda POS App', headerShown: false }}
      />
      <Stack.Screen
        name="addProduct"
        options={{ title: 'Tienda POS App', headerShown: false }}
      />
      <Stack.Screen
        name="findwords"
        options={{ title: 'Tienda POS App', headerShown: false }}
      />
      <Stack.Screen
        name="photo"
        options={{ title: 'Tienda POS App', headerShown: false }}
      />
      <Stack.Screen
        name="searchFromImg"
        options={{ title: 'Tienda POS App', headerShown: false }}
      />

      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
