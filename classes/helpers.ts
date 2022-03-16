export function getRndValInterval(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function flatArray(structure: any[]): any[] {
  return structure.reduce((acc, next) => {
    if (Array.isArray(next)) {
      return acc.concat(flatArray(next as any[]))
    }

    return acc.concat(next)
  }, [])
}
