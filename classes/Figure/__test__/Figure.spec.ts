import { Colors } from '../../constants'
import FigureFactory from '../FigureFactory'
import { FigurePatterns } from '../FigureTypes'

const TPatterns = FigurePatterns.T

describe('Test Layout class', () => {
  beforeEach(() => {})

  test('It should get first T pattern', () => {
    let figure = FigureFactory.create('T', [0, 0], Colors.green)
    expect(figure.getPattern()).toEqual(TPatterns[0])
  })

  test('It should give if fill point in position', () => {
    let figure = FigureFactory.create('T', [0, 0], Colors.green)
    expect(figure.isFillPoint([0, 0])).toBe(false)
    expect(figure.isFillPoint([0, 1])).toBe(true)
  })

  // test('It should change next pattern figure', () => {
  //   figure = FigureFactory.create('T', [0, 0], Colors.green)
  //   figure.setNextPattern()
  //   console.log(figure.activePattern)
  //   expect(figure!.getPattern()).toBe(TPatterns[1])
  // })

  test('It should return valid interval for change postiion of figure', () => {
    FigureFactory.init(10, 20)
  })
})
