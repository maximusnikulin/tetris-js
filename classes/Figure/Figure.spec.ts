import Figure, { FigureType } from '../Figure/Figure'
import FigureMaker from '../FigureMaker'

describe('Test Layout class', () => {
  let figureFirst: Figure = null
  beforeEach(() => {
    figureFirst = FigureMaker.create(FigureType.first)
  })

  test('It should get value of first typpe pattern', () => {
    expect(JSON.stringify(figureFirst.getPattern())).toBe(
      JSON.stringify([[0, 1, 1, 0], [1, 1, 1, 1]])
    )
  })

  test('It should has 0 value of pattern', () => {
    expect(figureFirst.getPointsArea()[0][0].getValue()).toBe(0)
  })

  test('It should has 1 value of pattern', () => {
    expect(figureFirst.getPointsArea()[0][1].getValue()).toBe(1)
  })
})
