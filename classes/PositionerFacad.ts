import PointsStack from './PointsStack/PointsStack'
import Figure from './Figure/Figure'

export default class {
  figure: Figure
  pointsStack: PointsStack
  constructor(pointsStack: PointsStack, figure: Figure) {
    this.pointsStack = pointsStack
    this.figure = figure
  }

  canAddFigure() {
    return this.pointsStack.canAddPoints(this.figure.getFigurePoints())
  }

  figurePointsAddedToStack() {
    const points = this.figure.getFigurePoints()
    if (this.pointsStack.canAddPoints(points)) {
      this.pointsStack.addPoints(points)
      return true
    }

    return false
  }

  figureIsShrinkedDown() {
    if (this.figure.canShrinkDown(this.pointsStack)) {
      this.figure.shrinkDown()
      return true
    }

    return false
  }
}
