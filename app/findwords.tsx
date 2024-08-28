import { Ref, RefObject, useState } from 'react'
import { View } from 'react-native'
import ConfirmPhoto from '../components/confirmPhoto'
import CameraWrapper from '@/components/cameraPermissions'
import { CameraCapturedPicture, CameraView, CameraViewRef } from 'expo-camera'

export default function FindWords() {
  const [taked, setTaked] = useState(false)
  const [image, setImage] = useState<CameraCapturedPicture>()

  const takePicture = (ref: RefObject<CameraView>) => {
    ref.current?.takePictureAsync().then((value) => {
      if (value == undefined) return
      setImage(value)

      setTaked(true)
    })
  }

  return (
    <View style={{ flex: 1 }}>
      {!taked ? (
        <CameraWrapper takePicture={takePicture} />
      ) : (
        <ConfirmPhoto image={image} back={() => setTaked(false)} />
      )}
    </View>
  )
}
