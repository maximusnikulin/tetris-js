import Figure, { Colors } from '../Figure'
import FigureFactory, { createFigureState } from '../FigureFactory'
import figurePatterns from '../FigureTypes'

const TPatterns = figurePatterns[4]
const activePattern = 1
const pattern = TPatterns[activePattern]

describe('Test Layout class', () => {
  let figure: Figure
  beforeEach(() => {
    figure = FigureFactory.create(
      createFigureState(TPatterns, 1),
      [0, 0],
      Colors.green
    )
  })

  test('It should get first T pattern', () => {
    expect(figure!.getPattern()).toEqual(TPatterns[0])
  })

  test('It should give if fill point in position', () => {
    expect(figure!.isFillPoint([0, 0])).toBe(false)
    expect(figure!.isFillPoint([0, 1])).toBe(true)
  })

  test('It should change next pattern figure', () => {
    figure.state.setNextPattern()
    expect(figure!.getPattern()).toBe(TPatterns[1])
  })
})
