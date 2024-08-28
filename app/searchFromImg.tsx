import { wordType } from '@/types/word.type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Canvas, Rect, SkRect } from '@shopify/react-native-skia'
import { ImageLoadEventData } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, NativeSyntheticEvent, PixelRatio, View } from 'react-native'

export default function searchFromImg() {
  const [image, setImg] = useState<string>()

  const [rects, setRects] = useState<SkRect[]>([])
  let { H, W, img }: any = useLocalSearchParams()

  H = Math.round(+H) - 20
  W = Math.round(+W) - 20
  const getDataFromstorage = async (w: number, h: number) => {
    AsyncStorage.getItem('items').then((storeItems) => {
      if (storeItems) {
        setTimeout(() => {
          getRects(storeItems, w, h)
        }, 100)
      }
    })  
  }

  const getRects = (items: string, w: number, h: number): void => {
    let parse: { words: wordType[] } = { words: [] }
    try {
      parse = JSON.parse(items)
    } catch (e) {
      console.log(e)
    }
    const ratio = PixelRatio.get()
    const px = (v: number) => Math.round((v * W) / w)
    const py = (v: number) => Math.round((v * H) / h)
    const words = parse.words
    setRects(
      words.map(({ bbox: { x0, x1, y0, y1 } }: wordType) => {
        return {
          x: px(x0),
          y: py(y0),
          width: px(x1 - x0),
          height: py(y1 - y0),
        }
      })
    )
  }
  const layout = ({ width, height }: any) => {
    getDataFromstorage(width, height)
  }
  useEffect(() => {
    setImg(img)
  }, [])

  return (
    <View style={{ backgroundColor: '#ddd', flex: 1 }}>
      {image && (
        <View style={{ paddingTop: 40, paddingHorizontal: 15 }}>
          <Image
            style={{
              borderWidth: 1,
              backgroundColor: 'black',
              width: W,
              height: H,
            }}
            alt="image"
            source={{ uri: image }}
            onLoad={(e) => layout(e.nativeEvent.source)}
          />
        </View>
      )}
      <Canvas
        style={{
          position: 'absolute',
          width: W,
          height: H,
          backgroundColor: 'transparent',
        }}
      >
        {rects.map(({ x, y, width, height }, index) => {
          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={width}
              height={height}
              color="rgba(255,40,40,0.85)"
              style="stroke"
              strokeWidth={2}
            />
          )
        })}
      </Canvas>
    </View>
  )
}
