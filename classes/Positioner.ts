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

  shrinkFigureDown(diff: number = 1) {
    const [x, y] = this.figure.getPosition()
    this.figure.setPosition([x, y + diff])
  }

  // canShrinkNewFigure() {
  //   const heightFigure = this.figure.getPattern().length
  //   return this.canShrinkFigureDown(heightFigure)
  // }

  // shrinkNewFigure() {
  //   const heightFigure = this.figure.getPattern().length
  //   this.shrinkFigureDown(heightFigure)
  // }

  canShrinkFigureDown(diff: number = 1) {
    let res = true
    for (let i = 0; i < diff; i++) {
      const figPoints = this.figure.getMapPoints()
      const maxY = this.pointsStack.getSize().rows

      res = Object.keys(figPoints).every(pos => {
        const [x, y] = pos.split(',').map(Number)
        if (y == maxY - 1) return false
        const pointInStack = this.pointsStack.getPoint([x, y + 1])
        return !(pointInStack.isFill() && figPoints[pos].isFill())
      })
    }

    return res
  }

  shrinkFigureByKey(keyCode: number) {
    const code = keyCode as 37 | 39 | 40 | 38
    // switch (e.keyCode) {
    //   //left
    //   case 37:
    //   // right
    //   case 39:
    //   // bottom
    //   case 40:
    //   case 38:
    // }
  }
}
