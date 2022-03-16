import { memoize } from 'lodash'

export function letsMemoize(resolver: () => string) {
  return function (target: any, functionName: string) {
    target[functionName] = memoize(target[functionName], resolver)
  }
}
