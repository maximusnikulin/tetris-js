import HeapFigures from '../HeapFigures/HeapFigures'
import Figure from '../Figure/Figure'

export default class PositionerFacade {
  private heapFigures: HeapFigures
  private figure!: Figure

  constructor(heap: HeapFigures) {
    this.heapFigures = heap
  }

  setFigure(figure: Figure) {
    this.figure = figure
  }

  canMergeFigureWithHeap() {
    const figureMapPoints = this.figure.getPoints()
    const points = this.heapFigures.getPoints()

    return Object.keys(figureMapPoints).every((key) => {
      let match = null
      try {
        match = points[key]
      } catch {
        throw new Error('Coordinate is not exists')
      }

      return !(figureMapPoints[key].isFill() && match.isFill())
    })
  }

  addFigureToHeap() {
    // heapFigures.addPoints(this.figure.getMapPoints())
  }

  private pushFigureDown() {
    this.changePosFigureVertical(1)
  }

  private pushFigureLeft() {
    this.changePosFigureHorizontal(-1)
  }

  private pushFigureRight() {
    this.changePosFigureHorizontal(1)
  }

  private changePosFigureVertical(diff: number = 1) {
    const [x, y] = this.figure.getPosition()
    this.figure.setPosition([x, y + diff])
  }

  private changePosFigureHorizontal(diff: number = 0) {
    const [x, y] = this.figure.getPosition()
    this.figure.setPosition([x + diff, y])
  }

  private pushFigureBottom() {
    while (this.canPushFigureDown()) {
      this.pushFigureDown()
    }
  }

  private canPushFigureDown() {
    const diff = 1
    const maxY = this.heapFigures.getSize().rows
    const [x, y] = this.figure.getPosition()
    const size = this.figure.getSize()
    const newBottomY = y + diff + size.height
    if (newBottomY > maxY) {
      return false
    }

    return this.canChangePosFigure(([x, y]) => [x, y + 1])
  }

  private canPushFigureLeft() {
    return this.canChangePosFigureHorizontal(-1)
  }

  private canPushFigureRight() {
    return this.canChangePosFigureHorizontal(1)
  }

  private canChangePosFigure(
    getNewCoordinates: (oldPointPos: [number, number]) => [number, number]
  ) {
    const figPoints = this.figure.getPoints()
    return Object.keys(figPoints).every((pos) => {
      const [x, y] = pos.split(',').map(Number)
      const pointInStack = this.heapFigures.getPoint(getNewCoordinates([x, y]))
      return !(pointInStack.isFill() && figPoints[pos].isFill())
    })
  }

  isNewPosFigureBetweenEdges(diff: 1 | -1) {
    const [x, y] = this.figure.getPosition()
    const size = this.figure.getSize()
    const { maxX, minX } = this.figure.getEdgeInterval()
    if (diff < 1) {
      const newX = x + diff
      if (newX < minX) {
        return false
      }
    } else {
      const newRightX = x + diff + size.width
      if (newRightX > maxX) {
        return false
      }
    }

    return true
  }

  private canChangePosFigureHorizontal(diff: -1 | 1) {
    return (
      this.isNewPosFigureBetweenEdges(diff) &&
      this.canChangePosFigure(([x, y]) => [x + diff, y])
    )
  }

  changePosFigureByKey(keyCode: number) {
    const code = keyCode as 37 | 39 | 40 | 38

    switch (code) {
      case 37:
        {
          if (this.canPushFigureLeft()) {
            this.pushFigureLeft()
          }
        }
        break
      case 39:
        {
          if (this.canPushFigureRight()) {
            this.pushFigureRight()
          }
        }
        break
      case 40:
        {
          this.pushFigureBottom()
        }
        break
      case 38: {
      }
    }
  }
}
