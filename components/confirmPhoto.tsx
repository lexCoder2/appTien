import { analizeImage } from '@/services/image.service'
import { Button } from '@react-native-material/core'
import { useRef, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native'
import { Image, ImageLoadEventData } from 'expo-image'
import ImgCanvas from './canvas'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function ConfirmPhoto({ image, back }: any) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sizeImg, setSizeImg] = useState([0, 0])
  const [src, setSrc] = useState({ uri: image.uri })
  const [showCanvas, setShowCanvas] = useState(true)
  const imgRef = useRef<Image>(null)

  const getText = async () => {
    setLoading(true)
    setData(null)

    analizeImage(src)
      .then(() => {
        setLoading(false)
        router.push(
          `/searchFromImg?H=${sizeImg[1]}&W=${sizeImg[0]}&img=${src.uri}`
        )
      })
      .catch((e) => {
        setLoading(false)
      })
  }
  const load = (e: LayoutChangeEvent) => {
    e.target.measureInWindow((x, y, width, height) => {
      setSizeImg([width, height])
    })
  }
  const loadI = (e: ImageLoadEventData) => {
    console.log('url', e.source.url)
  }

  const changeImg = (img: any) => {
    setSrc(img)
    setShowCanvas(false)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
      {loading && !data && (
        <View style={styles.loadding}>
          <Text style={{ fontSize: 24, color: 'white' }}>processando...</Text>
        </View>
      )}

      <View style={styles.buttons}>
        <Button
          style={styles.btn}
          variant="outlined"
          onPress={back}
          title="regresar"
        />
        <Button style={styles.btn} onPress={getText} title="analizar" />
      </View>
      <View style={styles.imageWrapper}>
        <Image
          ref={imgRef}
          //onLoad={load}
          onLayout={load}
          cachePolicy="disk"
          onLoad={loadI}
          alt="image"
          style={styles.image}
          source={src}
        />
        {showCanvas && (
          <ImgCanvas
            height={sizeImg[1]}
            onSave={changeImg}
            show={setShowCanvas}
            image={image.uri}
            width={sizeImg[0]}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '80%',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  imageWrapper: {
    flexGrow: 1,
    flexShrink: 0,
    paddingTop: 90,
    position: 'relative',
  },
  btn: { height: 45, width: '40%' },
  buttons: {
    gap: 10,
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  loadding: {
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    color: 'white',
    backgroundColor: 'rgba(1,1,1,.5)',
    width: '100%',
  },
})
