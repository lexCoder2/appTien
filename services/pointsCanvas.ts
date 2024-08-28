import { PointType } from '@/types/canvasPoint.type'

export const auxMethods = ({ x, y, translationX, translationY }: any, sP: PointType, W: number, H: number) => {
  'worklet';
  return ({
    move: (p: PointType) => {
      'worklet';
      const X = sP.x + translationX
      const Y = sP.y + translationY
      const w = sP.W + X
      const h = sP.H + Y
      return {
        ...p,
        x: (X > 0 && w < W) ? X : p.x,
        y: (Y > 0 && h < H) ? Y : p.y,
      }
    },
    resizeTop: (p: PointType) => {
      'worklet';

      return ({
        ...p,
        W: sP.W + translationX,
        H: sP.H + translationY,
      })

    },
    resizeBottom: () => {
      'worklet'
      return ({
        x: sP.x + translationX,
        y: sP.y + translationY,
        W: sP.W - translationX,
        H: sP.H - translationY,
      })
    }
  })
}