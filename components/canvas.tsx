import { GestureResponderEvent, StyleSheet } from 'react-native'
import {
  Canvas,
  Image,
  useCanvasRef,
  useImage,
} from '@shopify/react-native-skia'
import { useEffect, useState } from 'react'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import SkWindow from './canvasWindow'
import { imgCanvasProps as Props } from '@/types/imgCanvasProps'
import { PointType } from '@/types/canvasPoint.type'
import BtnCanvas from './actionsCanvas'
import { onPanInit, onPanUpdate } from '@/services/panGerstureFunctions'
import * as FS from 'expo-file-system'

const {
  makeDirectoryAsync,
  cacheDirectory,
  getInfoAsync,
  writeAsStringAsync,
  deleteAsync,
} = FS
type transformType = 'none' | 'top' | 'bottom' | 'move'

function ImgCanvas({ image, onSave, width, height }: Props) {
  const initVaule = { x: 100, y: 150, W: width - 200, H: height - 300 }
  const [point, setPoint] = useState<PointType>(initVaule)
  const [sPoint, setsPoint] = useState<PointType>(initVaule)
  const [transform, setTransform] = useState<transformType>('top')

  const [sImg, setSImg] = useState(1)
  const ref = useCanvasRef()
  const img = useImage(image)

  const reset = () => {
    setTransform('none')
    setPoint(initVaule)
    setsPoint(initVaule)
    setSImg(1)
  }
  useEffect(() => {
    reset()
  }, [])

  const save = async (e: GestureResponderEvent) => {
    const bounds = { ...point, width: point.W, height: point.H }
    const img = ref.current?.makeImageSnapshot(bounds)
    if (img) {
      const dir = `${cacheDirectory}Camera`
      const dirInfo = await getInfoAsync(dir)
      if (!dirInfo.exists) {
        try {
          await makeDirectoryAsync(dir)
        } catch (e) {
          console.log(e)
        }
      }
      try {
        const date = new Date().getTime()
        const uri = `${dir}/img1-${date}.jpeg`
        const uriInfo = getInfoAsync(uri)
        if ((await uriInfo).exists) {
          console.log('exist')
          try {
            await deleteAsync(uri)
          } catch (e) {
            console.log('error', e)
          }
        }
        await writeAsStringAsync(uri, img.encodeToBase64(), {
          encoding: 'base64',
        })
        onSave({ uri })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const pan = Gesture.Pan()
    .onStart(onPanInit({ setPoint, point, setTransform, sPoint, setsPoint }))
    .onUpdate(
      onPanUpdate({ sPoint, width, height, transform, setPoint, point })
    )
    .minDistance(1)
    .onEnd(() => {
      runOnJS(setTransform)('none')
      runOnJS(setsPoint)({ ...point })
    })

  let [s, setS] = useState(1)
  const pinch = Gesture.Pinch()
    .onUpdate(({ scale }) => {
      runOnJS(setSImg)(scale + scale * s)
    })
    .onEnd(({}) => {
      runOnJS(setS)(sImg)
      if (sImg < 1) runOnJS(setSImg)(1)
    })

  const sim = Gesture.Simultaneous(pan, pinch)

  return (
    <GestureHandlerRootView style={[st.container, { width, height }]}>
      <GestureDetector gesture={sim}>
        <Canvas ref={ref} style={{ width, height, backgroundColor: '#000' }}>
          <SkWindow w={width} h={height} point={point}>
            <Image
              fit="fitHeight"
              blendMode="srcOut"
              transform={[{ scale: sImg }]}
              origin={{ x: width / 2, y: height / 2 }}
              image={img}
              x={0}
              y={0}
              width={width}
              height={height}
            />
          </SkWindow>
        </Canvas>
      </GestureDetector>
      <BtnCanvas onSave={save} onReset={reset} />
    </GestureHandlerRootView>
  )
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 3,
    top: 90,
  },
})

export default ImgCanvas
