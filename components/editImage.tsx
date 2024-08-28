import React, { useState } from 'react'
import { View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { Canvas, Path, Rect } from '@shopify/react-native-skia'

interface IPath {
  x: number
  y: number
  width: number
  height: number
}

export default function Draw() {
  const [points, setPoints] = useState<IPath>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const pan = Gesture.Pan()
    .onStart(({ x, y }) => {
      if (points) {
        setPoints({ ...points, x, y })
      }
    })
    .onUpdate(({ x, y }) => {
      setPoints({
        ...points,
        width: Math.abs(x - points.x),
        height: Math.abs(y - points.y),
      })
    })
    .minDistance(1)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <Canvas style={{ flex: 8 }}>
            <Rect
              x={points.x}
              y={points.y}
              width={points.width}
              height={points.height}
              color="red"
            />
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}
