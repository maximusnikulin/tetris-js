import PointsStack, { sum } from './PointsStack'
import Figure, { FigureType } from '../Figure/Figure'
import FigureMaker from '../FigureMaker'

const getSnapshotStack = (pointsStack: PointsStack) => {
  const points = []
  pointsStack.getFlatPoints().forEach(point => {
    const [x, y] = point.getPosition()
    if (!points[y]) {
      points[y] = []
    }

    points[y][x] = point.getValue()
  })

  return JSON.stringify(points)
}

describe('Test Layout class', () => {
  let pointsStack: PointsStack = null
  let figure: Figure = null
  beforeEach(() => {
    pointsStack = new PointsStack(5, 5)
  })

  test('It should either can we change pos points or not', () => {
    figure = FigureMaker.create(FigureType.first, [0, 2])
    const points = figure.getPointsArea()
    expect(pointsStack.canChangePosPoints(points, { dY: 1 })).toBe(true)
    expect(pointsStack.canChangePosPoints(points, { dY: 3 })).toBe(false)
    expect(pointsStack.canChangePosPoints(points, { dX: -1 })).toBe(false)
    expect(pointsStack.canChangePosPoints(points, { dX: 1 })).toBe(true)
    expect(pointsStack.canChangePosPoints(points, { dX: 2 })).toBe(false)
  })
})
