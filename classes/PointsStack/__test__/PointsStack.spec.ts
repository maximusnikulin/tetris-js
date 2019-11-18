import PointsStack from '../PointsStack'
import {
  stackFiveOnFour,
  stackAfterSimpleAddPoints,
  stackBeforeSimpleAddPoints,
} from './mocks'
import FigureFactory from '../../Figure/FigureFactory'
import { FigureTypes, FigureTypePatterns } from '../../Figure/FigureTypes'
import { Colors } from '../../Figure/Figure'

describe('Test PointsStack', () => {
  let pointsStack: PointsStack
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
    expect(pointsStack.getPoints()).toEqual(stackFiveOnFour)
  })

  test('It should add points to stack', () => {
    const figure = FigureFactory.create(FigureTypes.L, 1, [0, 1])
    expect(pointsStack.getPoints()).toEqual(stackBeforeSimpleAddPoints)
    pointsStack.addPoints(figure.getMapPoints())
    expect(pointsStack.getPoints()).toEqual(stackAfterSimpleAddPoints)
  })

  // test('It should return points object with coordinates', () => {
  //   pointsStack = new PointsStack(2, 2, stackGetPoints)
  //   expect(pointsStack.getPoints()).toEqual(getPointsObject)
  // })

  // test('It should return points row', () => {
  //   const figure = FigureFactory.create(FigureType.first, [1, 2])
  //   pointsStack.addPoints(figure.getFigurePoints())
  //   expect(pointsStack.getPointsMatrix()).toEqual(stackAfterAddFigureToBottom)
  //   expect(pointsStack.getRow(3)).toEqual(stackRow)
  // })

  // test('It should shrink raw of points', () => {
  //   let figure = FigureFactory.create(FigureType.first, [0, 2])
  //   let pointsStack = new PointsStack(4, 4)
  //   pointsStack.addPoints(figure.getFigurePoints())
  //   pointsStack.collapse()
  //   expect(pointsStack.getPointsMatrix()).toEqual(stackAfterShrink)
  // })

  // test('It should return point from pos', () => {
  //   let figure = FigureFactory.create(FigureType.first, [0, 0])
  //   let pointsStack = new PointsStack(4, 4)
  //   pointsStack.addPoints(figure.getFigurePoints())
  //   expect(pointsStack.getPoint([0, 1])).toEqual(new Point(true, Colors.violet))
  // })

  // test('It should return equals rows', () => {
  //   let pointsStack = new PointsStack(4, 4, stackWithEquals)
  //   expect(pointsStack.getEqualsRows()).toEqual([1, 2])
  // })

  // test('It should collapse equal rows and shrink if needed', () => {
  //   let pointsStack = new PointsStack(4, 4, stackBeforeCollapse)
  //   expect(pointsStack.collapse()).toEqual(stackAfterCollapse)
  // })
})
