import PointsStack from '../PointsStack'
import {
  stackFiveOnFour,
  stackAfterAddFigureFirst,
  stackRow,
  stackAfterAddFigureToBottom,
  stackAfterShrink,
} from './mocks'
import FigureMaker from '../../FigureMaker'
import { FigureType, Colors } from '../../Figure/Figure'
import { Point } from '../../Point'

describe('Test PointsStack', () => {
  let pointsStack: PointsStack = null
  beforeEach(() => {
    pointsStack = new PointsStack(5, 4)
  })

  test('It should return size of PointsStack', () => {
    expect(pointsStack!.getSize()).toEqual({
      columns: 5,
      rows: 4,
    })
  })

  test('It should return all points in stack as matrix', () => {
    expect(pointsStack.getPointsMatrix()).toEqual(stackFiveOnFour)
  })

  test('It should add points to stack', () => {
    const figure = FigureMaker.create(FigureType.first, [0, 0])
    pointsStack.addPoints(figure.getFigurePoints())
    expect(pointsStack.getPointsMatrix()).toEqual(stackAfterAddFigureFirst)
  })

  test('It should return points row', () => {
    const figure = FigureMaker.create(FigureType.first, [1, 2])
    pointsStack.addPoints(figure.getFigurePoints())
    expect(pointsStack.getPointsMatrix()).toEqual(stackAfterAddFigureToBottom)
    expect(pointsStack.getRow(3)).toEqual(stackRow)
  })

  test('It should shrink raw of points', () => {
    let figure = FigureMaker.create(FigureType.first, [0, 2])
    let pointsStack = new PointsStack(4, 4)
    pointsStack.addPoints(figure.getFigurePoints())
    pointsStack.shrink(3)
    expect(pointsStack.getPointsMatrix()).toEqual(stackAfterShrink)
  })

  test('It should return point from pos', () => {
    let figure = FigureMaker.create(FigureType.first, [0, 0])
    let pointsStack = new PointsStack(4, 4)
    pointsStack.addPoints(figure.getFigurePoints())
    expect(pointsStack.getPoint([0, 1])).toEqual(new Point(true, Colors.violet))
  })
})
