import { PointType } from '@/types/canvasPoint.type'
import { Circle, Rect } from '@shopify/react-native-skia'
import { PropsWithChildren } from 'react'

export default function SkWindow({
  point,
  w,
  h,
  children,
}: PropsWithChildren<{ w: number; h: number; point: PointType }>) {
  return (
    <>
      <Rect
        blendMode="dstATop"
        x={0}
        y={0}
        width={w}
        height={h}
        color="rgba(0,0,0,0.35)"
      />
      <Rect
        blendMode="clear"
        x={point.x}
        y={point.y}
        width={point.W}
        height={point.H}
        color="#000"
      />
      {children}
      <Circle
        cx={point.x + point.W}
        cy={point.y + point.H}
        r={8}
        color={'rgba(255,255,255,.6)'}
      />
      <Circle cx={point.x} cy={point.y} r={8} color={'rgba(255,255,255,.6)'} />
    </>
  )
}
