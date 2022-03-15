import { getRndValInterval } from '../helpers'
import { Colors, FigureState } from './Figure'

export const getRandomColor = () => {
  const colorId = getRndValInterval(0, 4)
  const nameColors = Object.keys(Colors) as (keyof typeof Colors)[]
  const colorKey = nameColors[colorId as number]
  return Colors[colorKey]
}
