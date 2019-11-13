import PointsStack from './PointsStack/PointsStack'
import Figure from './Figure/Figure'

export default class Positioner {
  figure: Figure
  stack: PointsStack
  constructor(pointsStack: PointsStack, figure: Figure) {
    this.stack = pointsStack
    this.figure = figure
  }

  canAddFigure() {
    return this.stack.canAddPoints(this.figure.getMapPoints())
  }

  canShrinkFigureDown() {
    const figPoints = this.figure.getMapPoints()
    const maxY = this.stack.getSize().rows

    return Object.keys(figPoints).every(pos => {
      const [x, y] = pos.split(',').map(Number)
      if (y == maxY - 1) return false
      const pointInStack = this.stack.getPoint([x, y + 1])
      return !(pointInStack.isFill() && figPoints[pos].isFill())
    })
  }

  figurePointsAddedToStack() {
    const points = this.figure.getMapPoints()
    if (this.stack.canAddPoints(points)) {
      this.stack.addPoints(points)
      return true
    }

    return false
  }
}
