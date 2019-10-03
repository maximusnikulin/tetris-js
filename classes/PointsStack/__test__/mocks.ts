import { createPointsByPattern, createRowByPattern } from '../utils'
import { Point } from '../../Point'
import { Colors } from '../../Figure/Figure'

const p: (val: number, color?: Colors) => [number, Colors] = (
  val,
  color = Colors.violet
) => {
  return [val, color]
}

export const pointsStackObject = {
  [`0,0`]: new Point(),
  [`0,1`]: new Point(),
  [`1,0`]: new Point(),
  [`1,1`]: new Point(),
}

export const stackFiveOnFour = createPointsByPattern([
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
])

export const stackAfterAddFigureFirst = createPointsByPattern([
  [0, p(1), p(1), 0, 0],
  [p(1), p(1), p(1), p(1), 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
])

export const stackAfterAddFigureToBottom = createPointsByPattern([
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, p(1), p(1), 0],
  [0, p(1), p(1), p(1), p(1)],
])

export const stackAfterShrink = createPointsByPattern([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, p(1), p(1), 0],
])

export const stackRow = createRowByPattern([0, p(1), p(1), p(1), p(1)])
