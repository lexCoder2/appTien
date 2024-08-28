import { AskPermissions } from '@/components/askpermissions';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Photo({ onScan }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const camRef = useRef<CameraView>(null);
  useEffect(() => {
    requestPermission()
  },[])
  return (
    <View style={styles.container}>
      {!permission ? (
        <View> 
          <Text>loading</Text>
        </View>
      ) : !permission.granted ? (
        <AskPermissions reqPermissions={requestPermission} />
      ) : (
        <View style={styles.container}>
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: [
                "ean13",
                "ean8",
                "upc_e",
                "code39",
                "code93",
                "codabar",
                "code128",
                "upc_a",
              ],
            }}
         
            style={styles.camera}
            onBarcodeScanned={onScan}
          >
            
          </CameraView>
        </View>
      )}
    </View>
  );
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
  camera: {
    height:200,
    
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

