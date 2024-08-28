import { CameraView } from 'expo-camera'
import { useRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Camera({ onCapture }: any) {
  const camRef = useRef<CameraView>(null)
  return (
    <View>
      <CameraView ref={camRef} style={style.camView}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row-reverse',
            alignItems: 'flex-end',
          }}
        >
          <Pressable style={style.btnShoot} onPress={() => onCapture(camRef)}>
            <Text>shot</Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  )
}

const style = StyleSheet.create({
  btnShoot: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(200,200,200,.8)',
    borderWidth: 4,
    borderStyle: 'solid',
    width: 80,
    flexGrow: 0,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,.6)',
  },
  camView: {
    height: '100%',
    justifyContent: 'center',

    flexDirection: 'row-reverse',
  },
})
