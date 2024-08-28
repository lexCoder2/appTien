import { useCameraPermissions } from 'expo-camera'
import { useEffect } from 'react'
import { View } from 'react-native'
import { AskPermissions } from './askpermissions'
import Camera from './camera'

export default function CameraWrapper({ takePicture }: any) {
  const [permission, requestPermission] = useCameraPermissions()

  useEffect(() => {
    requestPermission()
  }, [])
  return (
    <View>
      {!permission ? (
        <View />
      ) : !permission.granted ? (
        <AskPermissions reqPermissions={requestPermission} />
      ) : (
        <Camera onCapture={takePicture} />
      )}
    </View>
  )
}
