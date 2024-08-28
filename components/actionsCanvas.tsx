import { Button } from '@react-native-material/core'
import { View } from 'react-native'

export default function BtnCanvas({ onSave, onReset }: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        padding: 15,
        justifyContent: 'space-around',
        height: 70,
        backgroundColor: '#333',
      }}
    >
      <Button
        variant="outlined"
        color="white"
        style={{ paddingHorizontal: 20 }}
        onPress={onReset}
        title="reset"
      ></Button>
      <Button
        style={{ paddingHorizontal: 20 }}
        onPress={onSave}
        title="usar recorte"
      ></Button>
    </View>
  )
}
