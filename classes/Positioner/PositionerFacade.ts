import HeapFigures from '../HeapFigures/HeapFigures'
import Figure from '../Figure/Figure'
import { Layout } from '../Layout'
import getEmptyLines from '../helpers/getEmptyLines'

export default class PositionerFacade {
  private heap: HeapFigures
  private figure!: Figure

  constructor(heap: HeapFigures, figure: Figure) {
    this.heap = heap
    this.figure = figure
  }

  getFigure() {
    return this.figure
  }

  getHeap() {
    return this.heap
  }

  getFigureAreaParams() {
    const pattern = this.figure.getPattern()
    const emptyLinesTop = getEmptyLines(pattern, 'top')
    const emptyLinesBottom = getEmptyLines(pattern, 'bottom')
    const emptyLinesLeft = getEmptyLines(pattern, 'left')
    const emptyLinesRight = getEmptyLines(pattern, 'right')
    const { width, height } = this.figure.getSize()
    const { columns, rows } = this.heap.getSize()
    const [x, y] = this.figure.getPosition()
    return {
      width,
      height,
      maxY: rows - this.figure.getSize().height + emptyLinesBottom,
      minY: -emptyLinesTop,
      minX: -emptyLinesLeft,
      maxX: columns - this.figure.getSize().width + emptyLinesRight,
      x,
      y,
    }
  }

  canMergeFigureWithHeap() {
    const figureMapPoints = this.figure.getPointsMap()
    const points = this.heap.getPointsMap()

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

  pushFigureDown() {
    this.changePosFigureVertical(1)
  }

  pushFigureTop() {
    this.changePosFigureVertical(-1)
  }

  pushFigureLeft() {
    this.changePosFigureHorizontal(-1)
  }

  pushFigureRight() {
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

  pushFigureToBottom() {
    while (this.canPushFigureDown()) {
      this.pushFigureDown()
    }
  }

  canPushFigureTop() {
    const { y, minY } = this.getFigureAreaParams()
    const newY = y - 1
    if (newY < minY) {
      return false
    }

    return this.canChangePosFigure(([x, y]) => [x, newY])
  }

  canPushFigureDown() {
    const { y, maxY } = this.getFigureAreaParams()
    const newY = y + 1
    if (newY > maxY) {
      return false
    }

    return this.canChangePosFigure(([x, y]) => [x, newY])
  }

  canPushFigureLeft() {
    return this.canChangePosFigureHorizontal(-1)
  }

  canPushFigureRight() {
    return this.canChangePosFigureHorizontal(1)
  }

  private canChangePosFigure(
    getNewCoordinates: (oldPointPos: [number, number]) => [number, number] = (
      pos
    ) => pos
  ) {
    const figPoints = this.figure.getPointsMap()
    return Object.keys(figPoints).every((pos) => {
      const [x, y] = pos.split(',').map(Number)
      const pointInHeap = this.heap.getPoint(getNewCoordinates([x, y]))
      const pointInFigure = figPoints[pos]
      // * If at least one point is empty
      return !(pointInHeap.isFill() && pointInFigure.isFill())
    })
  }

  isNewPosFigureBetweenEdges(diff: 1 | -1) {
    const [x, y] = this.figure.getPosition()
    const { maxX, minX } = this.getFigureAreaParams()
    const newX = x + diff
    if ((diff < 1 && newX < minX) || newX > maxX) {
      return false
    }

    return true
  }

  private canChangePosFigureHorizontal(diff: -1 | 1) {
    return (
      this.isNewPosFigureBetweenEdges(diff) &&
      this.canChangePosFigure(([x, y]) => [x + diff, y])
    )
  }

  rotateFigure() {
    this.figure.setNextPattern()
  }

  canRotateFigure() {
    this.figure.setNextPattern()
    const { maxX, minY, maxY, minX, x, y } = this.getFigureAreaParams()
    const gX = x > maxX ? maxX : x < minX ? minX : x
    const gY = y > maxY ? maxY : y < minY ? minY : y
    this.figure.setPosition([gX, gY])
    const canChangePos = this.canChangePosFigure()
    if (canChangePos) {
      this.figure.setPrevPattern()
    }
    return canChangePos
  }

  changePosFigureByKey(keyCode: number) {
    // * 38: ↑, 37: ←, 39: →, 40: ↓, 82: R
    const code = keyCode as 37 | 39 | 40 | 38 | 82

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
        if (this.canPushFigureDown()) {
          this.pushFigureDown()
        }
        break
      case 38:
        if (this.canPushFigureTop()) {
          this.pushFigureTop()
        }
        break
      case 82:
        if (this.canRotateFigure()) {
          this.rotateFigure()
        }
        break
    }
  }
}
