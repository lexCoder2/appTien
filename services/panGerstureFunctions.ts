import { GestureStateChangeEvent, GestureUpdateEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { auxMethods } from './pointsCanvas'

export const onPanInit = ({ setPoint, point, setTransform, sPoint, setsPoint }: any) => {

  return ({ x, y, translationX, translationY, numberOfPointers }: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    'worklet';
    if (numberOfPointers > 1) return

    if (Math.abs(x - point.x) < 50 && Math.abs(y - point.y) < 50) {
      runOnJS(setPoint)({ ...point, x, y })
      runOnJS(setsPoint)({ ...point, x, y })
      runOnJS(setTransform)('bottom')
    } else if (
      Math.abs(y - sPoint.y - point.H) < 50 &&
      Math.abs(x - sPoint.x - point.W) < 50
    ) {
      runOnJS(setTransform)('top')
    } else {
      runOnJS(setPoint)({
        ...point,
        x: point.x + translationX,
        y: point.y + translationY,
      })
      runOnJS(setTransform)('move')
    }
  }
}


export const onPanUpdate = ({ sPoint, width, height, transform, setPoint, point }: any) => {

  return (e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    'worklet';
    if (e.numberOfPointers > 1) return

    const { move, resizeTop, resizeBottom } = auxMethods(
      e,
      sPoint,
      width,
      height
    )
    if (transform == 'move') {
      runOnJS(setPoint)(move(point))
    }
    if (transform == 'top') {
      runOnJS(setPoint)(resizeTop(point))
    }
    if (transform == 'bottom') runOnJS(setPoint)(resizeBottom())
  }
}