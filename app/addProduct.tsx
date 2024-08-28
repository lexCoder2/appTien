import { StyleSheet, View} from 'react-native';
import { Button, TextInput, Pressable} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createElement, forwardRef, useEffect, useRef, useState } from 'react';
import Photo from './photo';
import { BarCodeScannerResult } from "expo-barcode-scanner";
import { apiGet } from '@/services/products.service';
export default function AddProduct() {
  const productRef = useRef(null)
  const [showCam, setShowCam ] = useState(false)
  const [text, setText] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')


  const prodText = createElement(TextInput,{
    color:"#777",
    style:style.input,
    onChange: (e:any) => setDescription(e.target.value),
    value: description,
    variant:"outlined",
    label:"Descripcion del producto(s)"
} )
  const onScan = (e: BarCodeScannerResult) => {
    setText(e.data)
    setShowCam(false)
  }
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 50,
        backgroundColor: "#fff",
        flex:1
      }}
    >
      {showCam ? <Photo onScan={onScan} /> : <></>}

      <View style={style.barcode}>
        <TextInput
          autoFocus
          value={text}
          color="#777"
          style={style.input}
          onChangeText={(e: any) => setText(e.target.value)}
          variant="outlined"
          label="codigo de barras"
        />
        <Pressable
          onPress={() => setShowCam(!showCam)}
          style={style.barcodeBtn}
        >
          <MaterialCommunityIcons name="line-scan" size={32} color="black" />
        </Pressable>
        <Pressable onPress={(e) => console.log(e)} style={style.barcodeBtn}>
          <MaterialIcons name="autorenew" size={24} color="black" />
        </Pressable>
      </View>
      <View style={style.barcode}>{prodText}</View>
      <View style={style.barcode}>
        <TextInput
          color="#777"
          style={style.input}
          variant="outlined"
          label="costo individual"
        />
        <TextInput
          color="#777"
          style={style.input}
          variant="outlined"
          label="precio venta"
        />
      </View>
      <View style={style.barcode}>
        <TextInput
          style={{ ...style.input, }}
          variant="outlined"
          label="cantidad"
        />
      </View>
      <View
        style={{
          ...style.barcode,
          marginTop: 40,
        }}
      >
        <Button variant="outlined" title="borrar"></Button>
        <Button title="Guardar producto"></Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  barcode: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    marginBottom: 15
  },
  inputStyle: {
    color: "#bbb"
  },
  barcodeBtn: {
    padding: 6,
    paddingHorizontal:9,
    marginBottom:4,
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1
  },
  input: {
    flexGrow:1,
    flexShrink:1
  }
})