import { flatArray, getEmptyLines } from '../helpers'

describe('helpers tests', () => {
  it('should flat array', () => {
    expect(flatArray([[1, 2], [3], [[[4, 5], 6, 7]]])).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ])
  })

  it('should check empty lines', () => {
    expect(
      getEmptyLines([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ])
    ).toBe(2)

    expect(
      getEmptyLines(
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ].reverse()
      )
    ).toBe(2)
  })
})
