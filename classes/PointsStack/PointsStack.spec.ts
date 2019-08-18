import Figure, { FigureType } from '../Figure/Figure'
import FigureMaker from '../FigureMaker'
import PointsStack from './PointsStack'
import { Point } from '../Point'

describe('Test Layout class', () => {
  let pointsStack: PointsStack = null
  let figure: Figure = null
  beforeEach(() => {
    pointsStack = new PointsStack(3, 3, [[0, 0, 0], [0, 1, 0], [0, 0, 0]])
    figure = FigureMaker.create(FigureType.first)
  })

  test('Point in center should equal value 1', () => {
    expect(pointsStack.getPoint([1, 1]).getValue()).toBe(1)
  })

  test('It should has 3 columns and 3 rows', () => {
    expect(pointsStack.getSize().columns).toBe(3)
    expect(pointsStack.getSize().rows).toBe(3)
  })

  test('It should return row', () => {
    expect(pointsStack.getRow(1)).toEqual({
      '0,1': new Point(0),
      '1,1': new Point(1),
      '2,1': new Point(0),
    })
  })
})
