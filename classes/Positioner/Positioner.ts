import Figure from '../Figure/Figure'
import PointsStack from '../PointsStack/PointsStack'

interface IPositioner {}

class Positioner implements IPositioner {
  canChangePosVertical(figure: Figure, stack: PointsStack) {}
  canChangePosHorizontal(figure: Figure, stack: PointsStack) {}
  canShrinkRaw(stack: PointsStack) {}
}
