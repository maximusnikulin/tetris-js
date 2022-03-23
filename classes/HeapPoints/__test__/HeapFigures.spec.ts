import { Colors } from '../../constants'
import FigureFactory from '../../Figure/FigureFactory'
import {
  createPointsByPattern,
  getSnapExplicitDebug,
} from '../../helpers/common'
import HeapPoints from '../HeapPoints'
// import {
//   stackFiveOnFour,
//   stackAfterSimpleAddPoints,
//   stackBeforeSimpleAddPoints,
// } from './mocks'

describe('Test HeapFigures', () => {
  it('should return size of heap', () => {
    const heap = new HeapPoints(10, 20)
    expect(heap!.getSize()).toEqual({
      columns: 10,
      rows: 20,
    })
  })

  it('should return points as map', () => {
    const heap = new HeapPoints()
    heap.setPoints(
      createPointsByPattern([
        [0, 0],
        [1, 1],
      ])
    )

    expect(heap.getPointsMap()).toMatchInlineSnapshot(`
      Object {
        "0,0": Point {
          "colorEmpty": "transparent",
          "colorFill": "rgb(131, 235, 122)",
          "fill": false,
        },
        "0,1": Point {
          "colorEmpty": "transparent",
          "colorFill": "rgb(131, 235, 122)",
          "fill": true,
        },
        "1,0": Point {
          "colorEmpty": "transparent",
          "colorFill": "rgb(131, 235, 122)",
          "fill": false,
        },
        "1,1": Point {
          "colorEmpty": "transparent",
          "colorFill": "rgb(131, 235, 122)",
          "fill": true,
        },
      }
    `)
  })

  it('should add points to heap', () => {
    const heap = new HeapPoints()
    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    )

    const figure = FigureFactory.create('O', [0, 1], Colors.aqua, 0)
    expect(getSnapExplicitDebug(heap)).toMatchInlineSnapshot(`
      Array [
        "[\\"0,0,0,0\\\\n\\"]",
        "[\\"0,0,0,0\\\\n\\"]",
        "[\\"0,0,0,0\\\\n\\"]",
        "[\\"0,0,0,0\\\\n\\"]",
      ]
    `)
    heap.mergePoints(figure.getPointsMap())
    expect(getSnapExplicitDebug(heap)).toMatchInlineSnapshot(`
      Array [
        "[\\"0,0,0,0\\\\n\\"]",
        "[\\"0,0,0,0\\\\n\\"]",
        "[\\"0,1,1,0\\\\n\\"]",
        "[\\"0,1,1,0\\\\n\\"]",
      ]
    `)

    const exp = [
      [1, 2],
      [1, 3],
      [2, 2],
      [2, 3],
    ].map((pos) => heap.getPoint(pos as [number, number]).getColor())
    const res = new Array(4).fill(Colors.aqua)
    expect(exp).toEqual(res)
  })
})
