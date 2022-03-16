import { flatArray } from './helpers'

describe('helpers tests', () => {
  it('should flat array', () => {
    expect(flatArray([[1, 2], [3], [[[4, 5], 6, 7]]])).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ])
  })
})
