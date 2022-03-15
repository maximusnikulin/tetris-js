import HeapFigures from '../HeapFigures/PointsStack'
import Figure from '../Figure/Figure'

export default class PositionerFacade {
  private figure: Figure
  private pointsStack: HeapFigures
  createdTs: number
  constructor(pointsStack: HeapFigures, figure: Figure) {
    this.pointsStack = pointsStack
    this.figure = figure
    this.createdTs = Date.now()
  }

  canAddFigureToStack() {
    const figureMapPoints = this.figure.getMapPoints()
    const points = this.pointsStack.getPoints()
    return Object.keys(figureMapPoints).every((key) => {
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

  private shrinkFigureDown() {
    this.shrinkFigureVertical(1)
  }

  private shrinkFigureVertical(diff: number = 1) {
    const [x, y] = this.figure.getPosition()
    this.figure.setPosition([x, y + diff])
  }

  private shrinkFigureLeft() {
    this.shrinkFigureHorizontal(-1)
  }

  private shrinkFigureRight() {
    this.shrinkFigureHorizontal(1)
  }

  private shrinkFigureHorizontal(diff: number = 0) {
    const [x, y] = this.figure.getPosition()
    this.figure.setPosition([x + diff, y])
  }

  private shrinkFigureMaxDown() {
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

  private canShrinkFigureLeft() {
    return this.canShrinkFigureVertical(-1)
  }

  private canShrinkFigureRight() {
    return this.canShrinkFigureVertical(1)
  }

  private canShrinkFigure(
    getNewCoordinates: (oldPointPos: number[]) => number[]
  ) {
    const figPoints = this.figure.getMapPoints()
    return Object.keys(figPoints).every((pos) => {
      const [x, y] = pos.split(',').map(Number)
      const pointInStack = this.pointsStack.getPoint(getNewCoordinates([x, y]))
      return !(pointInStack.isFill() && figPoints[pos].isFill())
    })
  }

  private canShrinkFigureVertical(diff: -1 | 1) {
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

  private canRotateFigure() {}

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
      }
    }
  }
}
