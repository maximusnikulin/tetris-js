import Layout, { sum } from './Layout'
import Figure, { FigureType } from '../Figure/Figure'
import FigureMaker from '../FigureMaker'

describe('Test Layout class', () => {
  let layout: Layout = null
  let figure: Figure = null
  beforeEach(() => {
    layout = new Layout(40, 20)
    figure = FigureMaker.create(FigureType.first)
  })

  test('It should has 20 columns and 40 rows', () => {
    expect(layout.getSize().width).toBe(20)
    expect(layout.getSize().height).toBe(40)
  })

  test('It should allow to add figure', () => {
    expect(layout.canPosFigure(figure, [1, 0])).toBe(true)
  })

  test('It should forbid to add figure', () => {
    layout = new Layout(40, 20, 1)
    expect(layout.canPosFigure(figure, [1, 0])).toBe(false)
  })

  test('It should add figure', () => {
    layout.addFigure(figure, [1, 0])
    expect(layout.grid[0][1].value).toBe(0)
    expect(layout.grid[0][2].value).toBe(1)
    expect(layout.grid[0][3].value).toBe(1)
    expect(layout.grid[0][4].value).toBe(0)
    expect(layout.grid[1][1].value).toBe(1)
    expect(layout.grid[1][2].value).toBe(1)
    expect(layout.grid[1][3].value).toBe(1)
    expect(layout.grid[1][4].value).toBe(1)
  })
})
