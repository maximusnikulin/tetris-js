import { toMatchFile } from 'jest-file-snapshot'
import Figure from '../../Figure/Figure'
import FigureFactory from '../../Figure/FigureFactory'
import { FigurePatterns, FigureTypes } from '../../Figure/FigureTypes'
import HeapFigures from '../../HeapFigures/HeapFigures'
import { createPointsByPattern, getSnapDebug } from '../../HeapFigures/helpers'
import { Colors } from '../../helpers/helpers'
import PositionerFacade from '../PositionerFacade'
import {
  roundUpHorFigureTest,
  rotateFigureTest,
  pushDownVertFigureTest,
} from './heplers'

expect.extend({ toMatchFile })

const getPath = (base: string) => (postfix: string) => base + '/' + postfix

const getPathInSnaps = getPath(
  'classes/Positioner/__tests__/__file_snapshots__'
)

const figureTypes: FigureTypes[] = Object.keys(FigurePatterns) as FigureTypes[]

describe('Test Positioner', () => {
  test('pos hor for roundup-empty', () => {
    let heap = new HeapFigures()

    figureTypes.forEach((type) => {
      const figure = FigureFactory.create(type, [0, 0], Colors.aqua, 0)
      expect(
        roundUpHorFigureTest({ figure, heap, initPos: [2, 0] })
      ).toMatchFile(getPathInSnaps('roundup-empty/' + type))
    })
  })

  test('pos hor for roundup-with-vertical', () => {
    let heap = new HeapFigures()

    heap.setPoints(
      createPointsByPattern([
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      ])
    )

    figureTypes.forEach((type) => {
      const figure = FigureFactory.create(type, [0, 0], Colors.aqua, 0)
      expect(
        roundUpHorFigureTest({ figure, heap, initPos: [3, 0] })
      ).toMatchFile(getPathInSnaps('roundup-with-vertical/' + type))
    })
  })

  test('pos hor for roundup-with-mixed', () => {
    let heap = new HeapFigures()

    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
      ])
    )

    figureTypes.forEach((type) => {
      const figure = FigureFactory.create(type, [0, 0], Colors.aqua, 0)
      expect(
        roundUpHorFigureTest({ figure, heap, initPos: [2, 0] })
      ).toMatchFile(getPathInSnaps('roundup-with-mixed/' + type))
    })
  })

  test('pos vert for push-down-empty', () => {
    let heap = new HeapFigures()

    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    )

    figureTypes.forEach((type) => {
      const figure = FigureFactory.create(type, [0, 0], Colors.aqua, 0)
      expect(pushDownVertFigureTest({ figure, heap })).toMatchFile(
        getPathInSnaps('push-down-empty/' + type)
      )
    })
  })

  test('rotate figure for rotate-empty area', () => {
    let heap = new HeapFigures()

    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ])
    )

    figureTypes.forEach((type) => {
      const figure = FigureFactory.create(type, [0, 0], Colors.aqua, 0)
      expect(rotateFigureTest({ figure, heap, initPos: [2, 0] })).toMatchFile(
        getPathInSnaps('rotate-empty/' + type)
      )
    })
  })

  test('rotate figure for not-empty area', () => {
    let heap = new HeapFigures()

    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 1, 0, 0],
        [1, 1, 0, 0, 1, 0, 0],
        [1, 1, 0, 0, 1, 0, 0],
      ])
    )

    let figure = FigureFactory.create('J', [2, 1], Colors.aqua, 1)

    let positioner = new PositionerFacade(heap, figure)
    expect(getSnapDebug(positioner)).toMatchInlineSnapshot(`
      Array [
        "[\\"0,0,0,0,0,0,0\\"]",
        "[\\"1,1,3,2,3,0,0\\"]",
        "[\\"1,1,3,2,1,0,0\\"]",
        "[\\"1,1,2,2,1,0,0\\"]",
        "[\\"1,1,0,0,1,0,0\\"]",
      ]
    `)
    expect(positioner.canRotateFigure()).toBeFalsy()

    figure = FigureFactory.create('Z', [4, 1], Colors.aqua, 1)
    positioner = new PositionerFacade(heap, figure)
    expect(getSnapDebug(positioner)).toMatchInlineSnapshot(`
      Array [
        "[\\"0,0,0,0,0,0,0\\"]",
        "[\\"1,1,0,0,3,3,2\\"]",
        "[\\"1,1,0,0,1,2,2\\"]",
        "[\\"1,1,0,0,1,2,3\\"]",
        "[\\"1,1,0,0,1,0,0\\"]",
      ]
    `)

    expect(positioner.canRotateFigure()).toBeFalsy()

    figure.setPosition([4, 0])
    expect(getSnapDebug(positioner)).toMatchInlineSnapshot(`
      Array [
        "[\\"0,0,0,0,3,3,3\\"]",
        "[\\"1,1,0,0,2,2,3\\"]",
        "[\\"1,1,0,0,1,2,2\\"]",
        "[\\"1,1,0,0,1,0,0\\"]",
        "[\\"1,1,0,0,1,0,0\\"]",
      ]
    `)
    expect(positioner.canRotateFigure()).toBeTruthy()
    positioner.rotateFigure()
    expect(getSnapDebug(positioner)).toMatchInlineSnapshot(`
      Array [
        "[\\"0,0,0,0,3,3,2\\"]",
        "[\\"1,1,0,0,3,2,2\\"]",
        "[\\"1,1,0,0,1,2,3\\"]",
        "[\\"1,1,0,0,1,0,0\\"]",
        "[\\"1,1,0,0,1,0,0\\"]",
      ]
    `)
  })
})
