import { toMatchFile } from 'jest-file-snapshot'
import { Colors } from '../../constants'
import Figure from '../../Figure/Figure'
import FigureFactory from '../../Figure/FigureFactory'
import { FigurePatterns, FigureTypes } from '../../Figure/FigureTypes'
import HeapPoints from '../../HeapPoints/HeapPoints'
import {
  createPointsByPattern,
  getSnapExplicitDebug,
  getSnapHeapAndFigure,
} from '../../helpers/common'
import HeapFigureBehaviorFacade from '../HeapFigureBehaviorFacade'
import {
  roundUpHorFigureTest,
  rotateFigureTest,
  pushDownVertFigureTest,
} from './heplers'
import * as path from 'path'

expect.extend({ toMatchFile })

const getPath = (base: string) => (postfix: string) => base + '/' + postfix

const getPathInSnaps = getPath(path.resolve(__dirname, '__file_snapshots__'))

const figureTypes: FigureTypes[] = Object.keys(FigurePatterns) as FigureTypes[]

describe('Test Positioner', () => {
  test('pos hor for roundup-empty', () => {
    let heap = new HeapPoints()

    figureTypes.forEach((type) => {
      const figure = FigureFactory.create(type, [0, 0], Colors.aqua, 0)
      expect(
        roundUpHorFigureTest({ figure, heap, initPos: [2, 0] })
      ).toMatchFile(getPathInSnaps('roundup-empty/' + type))
    })
  })

  test('pos hor for roundup-with-vertical', () => {
    let heap = new HeapPoints()

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
    let heap = new HeapPoints()

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
    let heap = new HeapPoints()

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

  test('pos vert for push-down-not-empty', () => {
    let heap = new HeapPoints()

    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ])
    )

    figureTypes.forEach((type) => {
      const figure = FigureFactory.create(type, [0, 0], Colors.aqua, 0)
      expect(pushDownVertFigureTest({ figure, heap })).toMatchFile(
        getPathInSnaps('push-down-not-empty/' + type)
      )
    })
  })

  test('rotate figure for rotate-empty area', () => {
    let heap = new HeapPoints()

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
    let heap = new HeapPoints()

    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0],
      ])
    )

    figureTypes.forEach((type) => {
      const figure = FigureFactory.create(type, [0, 0], Colors.aqua, 0)
      const behavior = new HeapFigureBehaviorFacade(heap, figure)
      const { x, minY } = behavior.getFigureAreaParams()
      expect(
        rotateFigureTest({ figure, heap, initPos: [x, minY] })
      ).toMatchFile(getPathInSnaps('rotate-not-empty/' + type))
    })
  })

  it('should check can merge figure to heap', () => {
    const heap = new HeapPoints()
    const figure = FigureFactory.create('I', [0, 0], Colors.aqua, 0)
    const positioner = new HeapFigureBehaviorFacade(heap, figure)

    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1],
      ])
    )
    const { minY, x } = positioner.getFigureAreaParams()
    figure.setPosition([x, minY])

    expect(getSnapHeapAndFigure(positioner)).toMatchInlineSnapshot(`
      Array [
        "[\\"2,2,2,2,0,0,0\\"]",
        "[\\"1,1,1,1,1,1,1\\"]",
      ]
    `)

    expect(positioner.canMergeFigureWithHeap()).toBeTruthy()
  })

  it('cant merge figure to heap', () => {
    const heap = new HeapPoints()
    const figure = FigureFactory.create('I', [0, 0], Colors.aqua, 0)
    const positioner = new HeapFigureBehaviorFacade(heap, figure)

    heap.setPoints(
      createPointsByPattern([
        [1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1],
      ])
    )
    const { minY, x } = positioner.getFigureAreaParams()
    figure.setPosition([x, minY])
    expect(getSnapHeapAndFigure(positioner)).toMatchInlineSnapshot(`
      Array [
        "[\\"1,2,2,2,0,0,0\\"]",
        "[\\"1,1,1,1,1,1,1\\"]",
      ]
    `)

    expect(positioner.canMergeFigureWithHeap()).toBeFalsy()
  })

  it('cant merge figure by figures to heap', () => {
    const heap = new HeapPoints()
    const figure1 = FigureFactory.create('I', [0, 0], Colors.aqua, 0)
    const positioner1 = new HeapFigureBehaviorFacade(heap, figure1)
    heap.setPoints(
      createPointsByPattern([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ])
    )

    const { maxY } = positioner1.getFigureAreaParams()
    figure1.setPosition([0, maxY])

    expect(positioner1.canMergeFigureWithHeap()).toBeTruthy()
    positioner1.mergeFigureWithHeap()
    expect(getSnapExplicitDebug(heap)).toMatchInlineSnapshot(`
      Array [
        "[\\"0,0,0,0,0,0,0\\"]",
        "[\\"0,0,0,0,0,0,0\\"]",
        "[\\"0,0,0,0,0,0,0\\"]",
        "[\\"1,1,1,1,0,0,0\\"]",
      ]
    `)

    const figure2 = FigureFactory.create('I', [0, 0], Colors.aqua, 0)
    const positioner2 = new HeapFigureBehaviorFacade(heap, figure2)
    expect(getSnapHeapAndFigure(positioner2)).toMatchInlineSnapshot(`
      Array [
        "[\\"3,3,3,3,0,0,0\\"]",
        "[\\"3,3,3,3,0,0,0\\"]",
        "[\\"2,2,2,2,0,0,0\\"]",
        "[\\"1,1,1,1,0,0,0\\"]",
      ]
    `)

    expect(positioner2.canPushFigureDown()).toBeFalsy()
  })
})
