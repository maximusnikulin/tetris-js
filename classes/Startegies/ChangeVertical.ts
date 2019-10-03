import PointsStack from '../PointsStack/PointsStack'
import Figure from '../Figure/Figure'

class ChangeVerticallStrategy {
  pointsStack: PointsStack
  constructor(pointsStack: PointsStack) {
    this.pointsStack = pointsStack
  }

  canShrinkDown(figure: Figure) {
    const figPoints = figure.getFigurePoints()
    const stackPoints = this.pointsStack.getPoints()
    const maxY = this.pointsStack.getSize().rows

    return Object.keys(figPoints).every(pos => {
      const [x, y] = pos.split(',').map(Number)
      if (y >= maxY) return false
      const pointInStack = this.pointsStack.getPoint([+x, +(y + 1)])
      return +pointInStack.fill + +figPoints[pos].fill < 2
    })
  }

  shrinkDown(figure: Figure) {
    const [x, y] = figure.getPosition()
    figure.setPosition([x, y + 1])
  }
}

export default ChangeVerticallStrategy
