import Figure from '../../Figure/Figure'
import HeapFigures from '../../HeapFigures/HeapFigures'
import { getSnapDebug } from '../../HeapFigures/helpers'
import PositionerFacade from '../PositionerFacade'

export function rotateFigureTest(params: {
  heap: HeapFigures
  figure: Figure
  initPos: [number, number]
}) {
  const { heap, figure, initPos } = params
  const type = figure.getType()
  const positioner = new PositionerFacade(heap, figure)
  const patternsLength = figure.getPatterns().length
  figure.setPattern(0)

  const rotates = () => {
    const pos = positioner.getFigure().getPosition()
    let countRotates = 0
    let snaps = [getSnapDebug(positioner)]
    while (positioner.canRotateFigure() && countRotates < patternsLength) {
      if (positioner.canRotateFigure()) {
        positioner.rotateFigure()
        countRotates++
        snaps.push(getSnapDebug(positioner))
      }
    }

    return {
      pos,
      countRotates,
      snaps,
    }
  }

  const resetFigure = (pos: [number, number] = initPos) => {
    positioner.getFigure().setPattern(0)
    positioner.getFigure().setPosition(pos)
  }

  resetFigure()
  let left = [rotates()]

  while (positioner.canPushFigureLeft()) {
    positioner.pushFigureLeft()
    let pos = figure.getPosition()
    left.push(rotates())
    resetFigure(pos)
  }

  resetFigure()
  let right = [rotates()]

  while (positioner.canPushFigureRight()) {
    positioner.pushFigureRight()
    let pos = figure.getPosition()
    right.push(rotates())
    resetFigure(pos)
  }

  return JSON.stringify(
    {
      type,
      left,
      right,
    },
    null,
    2
  )
}

export function pushDownVertFigureTest(params: {
  heap: HeapFigures
  figure: Figure
}) {
  const { heap, figure } = params
  const type = figure.getType()
  const positioner = new PositionerFacade(heap, figure)
  const patternsLength = figure.getPatterns().length

  let steps = 0
  let i = 0

  const result = {
    type,
    patterns: [] as any,
  }

  while (i < patternsLength) {
    figure.setPattern(i)
    const patternIndex = figure.getPatternIndex()
    const { minY, x } = positioner.getFigureAreaParams()
    figure.setPosition([x, minY])
    const snaps = [getSnapDebug(positioner)]

    while (positioner.canPushFigureDown()) {
      positioner.pushFigureDown()
      steps++
      snaps.push(getSnapDebug(positioner))
    }

    i++
    result.patterns.push({
      patternIndex,
      snaps,
    })
  }

  return JSON.stringify(result, null, 2)
}

export function roundUpHorFigureTest(params: {
  figure: Figure
  heap: HeapFigures
  initPos?: [number, number]
}) {
  const { figure, heap, initPos = [0, 1] } = params

  figure.setPosition(initPos)

  const positioner = new PositionerFacade(heap, figure)
  const patternsLength = figure.getPatterns().length
  let i = 0

  const type = figure.getType()
  let result = {
    type,
    patterns: [] as any[],
  }

  while (i < patternsLength) {
    figure.setPattern(i)

    const patternIndex = figure.getPatternIndex()

    figure.setPosition(initPos)
    let snapsLeft = [getSnapDebug(positioner)]
    let stepsLeft = 0

    while (positioner.canPushFigureLeft()) {
      positioner.pushFigureLeft()
      snapsLeft.push(getSnapDebug(positioner))
      stepsLeft++
    }

    figure.setPosition(initPos)
    let snapsRight = [getSnapDebug(positioner)]
    let stepsRight = 0

    while (positioner.canPushFigureRight()) {
      positioner.pushFigureRight()
      snapsRight.push(getSnapDebug(positioner))
      stepsRight++
    }

    i++

    result.patterns.push({
      patternIndex,
      left: {
        stepsLeft,
        snapsLeft,
      },
      right: {
        stepsRight,
        snapsRight,
      },
    })
  }

  return JSON.stringify(result, null, 2)
}
