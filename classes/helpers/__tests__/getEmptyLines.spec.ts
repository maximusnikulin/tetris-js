import getEmptyLines from '../getEmptyLines'

describe('getEmptyLines test', () => {
  it('should check empty lines right', () => {
    expect(
      getEmptyLines(
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ],
        'right'
      )
    ).toBe(2)

    expect(
      getEmptyLines(
        [
          [0, 0, 0, 1],
          [0, 0, 0, 1],
          [0, 0, 0, 1],
          [0, 0, 0, 1],
        ],
        'right'
      )
    ).toBe(0)

    expect(
      getEmptyLines(
        [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
        ],
        'right'
      )
    ).toBe(3)
  })

  it('should check empty lines left', () => {
    expect(
      getEmptyLines(
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ],
        'left'
      )
    ).toBe(1)

    expect(
      getEmptyLines(
        [
          [0, 0, 0, 1],
          [0, 0, 0, 1],
          [0, 0, 0, 1],
          [0, 0, 0, 1],
        ],
        'left'
      )
    ).toBe(3)

    expect(
      getEmptyLines(
        [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
        ],
        'left'
      )
    ).toBe(0)
  })

  it('should check empty lines top', () => {
    expect(
      getEmptyLines(
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
        ],
        'top'
      )
    ).toBe(2)

    expect(
      getEmptyLines(
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 1, 1],
        ],
        'top'
      )
    ).toBe(3)

    expect(
      getEmptyLines(
        [
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        'top'
      )
    ).toBe(0)
  })
})
