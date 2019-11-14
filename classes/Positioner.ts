import PointsStack from './PointsStack/PointsStack'
import Figure from './Figure/Figure'

export default class Positioner {
  private figure: Figure
  private pointsStack: PointsStack
  createdTs: number
  constructor(pointsStack: PointsStack, figure: Figure) {
    this.pointsStack = pointsStack
    this.figure = figure
    this.createdTs = Date.now()
  }

  canAddFigureToStack() {
    const figureMapPoints = this.figure.getMapPoints()
    const points = this.pointsStack.getPoints()
    return Object.keys(figureMapPoints).every(key => {
      const [x, y] = key.split(',').map(Number)
      let match = null
      try {
        match = points[y][x]
      } catch {
        throw new Error('Coordinate is not exists')
      }

      return !(figureMapPoints[key].isFill() && match.isFill())
    })
  }

  addFigureToStack() {
    this.pointsStack.addPoints(this.figure.getMapPoints())
  }

  shrinkFigureDown() {
    this.shrinkFigureVertical(1)
  }

  shrinkFigureVertical(diff: number = 1) {
    const [x, y] = this.figure.getPosition()
    this.figure.setPosition([x, y + diff])
  }

  shrinkFigureLeft() {
    this.shrinkFigureHorizontal(-1)
  }

  shrinkFigureRight() {
    this.shrinkFigureHorizontal(1)
  }

  shrinkFigureHorizontal(diff: number = 0) {
    const [x, y] = this.figure.getPosition()
    this.figure.setPosition([x + diff, y])
  }

  shrinkFigureMaxDown() {
    while (this.canShrinkFigureDown()) {
      this.shrinkFigureDown()
    }
  }

  canShrinkFigureDown(diff: 1 | -1 = 1) {
    const maxY = this.pointsStack.getSize().rows
    const [x, y] = this.figure.getPosition()
    const size = this.figure.getSize()
    const newBottomY = y + diff + size.height
    if (newBottomY > maxY) {
      return false
    }

    return this.canShrinkFigure(([x, y]) => [x, y + 1])
  }

  canShrinkFigureLeft() {
    return this.canShrinkFigureVertical(-1)
  }

  canShrinkFigureRight() {
    return this.canShrinkFigureVertical(1)
  }

  canShrinkFigure(getNewCoordinates: (oldPointPos: number[]) => number[]) {
    const figPoints = this.figure.getMapPoints()
    return Object.keys(figPoints).every(pos => {
      const [x, y] = pos.split(',').map(Number)
      const pointInStack = this.pointsStack.getPoint(getNewCoordinates([x, y]))
      return !(pointInStack.isFill() && figPoints[pos].isFill())
    })
  }

  canShrinkFigureVertical(diff: -1 | 1) {
    const [x, y] = this.figure.getPosition()
    const size = this.figure.getSize()
    if (diff < 1) {
      const newX = x + diff
      if (newX < 0) {
        return false
      }
    } else {
      const newRightX = x + diff + size.width
      if (newRightX > this.pointsStack.getSize().columns) {
        return false
      }
    }

    return this.canShrinkFigure(([x, y]) => [x + diff, y])
  }

  // canRotateFigure () {

  // }

  // rotateFigure () {
  //   // this.figure.rotateFigure()
  // }

  shrinkFigureByKey(keyCode: number) {
    const code = keyCode as 37 | 39 | 40 | 38
    switch (code) {
      case 37:
        {
          if (this.canShrinkFigureLeft()) {
            this.shrinkFigureLeft()
          }
        }
        break
      case 39:
        {
          if (this.canShrinkFigureRight()) {
            this.shrinkFigureRight()
          }
        }
        break
      case 40:
        {
          this.shrinkFigureMaxDown()
        }
        break
      case 38: {
        //rotate
      }
    }
  }
}
