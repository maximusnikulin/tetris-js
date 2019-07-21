import PointsStack, { sum } from './PointsStack'
import Figure, { FigureType } from '../Figure/Figure'
import FigureMaker from '../FigureMaker'

describe('Test Layout class', () => {
  let pointsStack: PointsStack = null
  let figure: Figure = null
  beforeEach(() => {
    pointsStack = new PointsStack(10, 20)
    figure = FigureMaker.create(FigureType.first)
  })

  test('It should has 10 columns and 20 rows', () => {
    expect(pointsStack.getSize().columns).toBe(10)
    expect(pointsStack.getSize().rows).toBe(20)
  })

  test('It should allow to add first figure', () => {
    expect(pointsStack.canChangePosFigure(figure, [1, 0])).toBe(true)
  })

  test('It should forbid to add first figure', () => {
    pointsStack = new PointsStack(10, 20, 1)
    expect(pointsStack.canChangePosFigure(figure, [1, 0])).toBe(false)
  })

  test('It should allow to add figure', () => {
    figure.setPosition([1, 0])
    expect(pointsStack.canChangePosFigure(figure, [1, 1])).toBe(true)
  })

  test('It should forbid to add figure', () => {
    figure.setPosition([1, 0])
    pointsStack.addFigure(figure)
    const nextFigure = FigureMaker.create(FigureType.first)
    expect(pointsStack.canChangePosFigure(nextFigure, [1, 1])).toBe(false)
  })

  test('It should add figure', () => {
    figure.setPosition([1, 0])
    figure.setPosition([1, 1])
    figure.setPosition([1, 2])
    pointsStack.addFigure(figure)
    expect(pointsStack.getPoint([1, 1]).value).toBe(0)
    expect(pointsStack.getPoint([2, 1]).value).toBe(0)
    expect(pointsStack.getPoint([3, 1]).value).toBe(0)
    expect(pointsStack.getPoint([4, 1]).value).toBe(0)

    expect(pointsStack.getPoint([1, 2]).value).toBe(0)
    expect(pointsStack.getPoint([2, 2]).value).toBe(1)
    expect(pointsStack.getPoint([3, 2]).value).toBe(1)
    expect(pointsStack.getPoint([4, 2]).value).toBe(0)

    expect(pointsStack.getPoint([1, 3]).value).toBe(1)
    expect(pointsStack.getPoint([2, 3]).value).toBe(1)
    expect(pointsStack.getPoint([3, 3]).value).toBe(1)
    expect(pointsStack.getPoint([4, 3]).value).toBe(1)
  })

  test('It should forbid to change position figure', () => {
    pointsStack = new PointsStack(10, 20)
    figure.setPosition([0, 18])
    expect(pointsStack.canChangePosFigure(figure, [0, 21])).toBe(false)
  })

  test('It should remove row', () => {
    // figure.setPosition([0, 2])
    // pointsStack.addFigure(figure)
    // pointsStack.removeRow(2)
    // pointsStack.shrink(2)
    // expect().toBe()
  })
})
