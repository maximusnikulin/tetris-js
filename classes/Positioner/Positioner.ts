import Figure from '../Figure/Figure'
import PointsStack from '../PointsStack/PointsStack'

interface IPositioner {}

class Positioner implements IPositioner {
  canChangePositionFigure(figure: Figure, stack: PointsStack) {}
  canShrinkPointsStack(stack: PointsStack) {}
}
