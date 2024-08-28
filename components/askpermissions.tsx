import { Button } from '@react-native-material/core'
import { PermissionResponse } from 'expo-camera'
import { StyleSheet, Text, View } from 'react-native'


type permission = {
  reqPermissions: () => Promise<PermissionResponse>
}
export const AskPermissions = ({reqPermissions}: permission) => {

    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={() => reqPermissions()} title="grant permission" />
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
    justifyContent: 'center',
    height:400,
    width: '100%'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
})