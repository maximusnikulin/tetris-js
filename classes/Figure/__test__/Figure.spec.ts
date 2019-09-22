import Figure, { FigureType } from '../Figure'
import FigureMaker, { firstPattern } from '../../FigureMaker'

describe('Test Layout class', () => {
  let figureFirst: Figure = null
  beforeEach(() => {
    figureFirst = FigureMaker.create(FigureType.first)
  })

  test('It should get value of first type pattern', () => {
    expect(figureFirst.getPattern()).toEqual(firstPattern)
  })

  test('It should has 0 value of pattern', () => {
    expect(figureFirst.isFillPoint([0, 0])).toBe(false)
  })

  test('It should has 1 value of pattern', () => {
    expect(figureFirst.isFillPoint([0, 1])).toBe(true)
  })
})
