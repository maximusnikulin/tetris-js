const getEmptyLines = (
  pattern: number[][],
  side: 'left' | 'right' | 'top' | 'bottom'
) => {
  let maxRowIndex = pattern.length - 1
  let maxColIndex = pattern[0].length - 1
  let count = 0

  if (side === 'left') {
    let i = 0
    let j = 0
    while (pattern[j][i] !== 1) {
      if (j === maxRowIndex) {
        j = 0
        i++
        count++
      } else {
        j++
      }

      if (j === maxRowIndex && i === maxColIndex) {
        break
      }
    }
  }

  if (side === 'right') {
    let i = maxColIndex
    let j = 0
    while (pattern[j][i] !== 1) {
      if (j === maxRowIndex) {
        j = 0
        i--
        count++
      } else {
        j++
      }

      if (j === maxRowIndex && i === 0) {
        break
      }
    }
  }

  if (side === 'top') {
    let i = 0
    let j = 0
    while (pattern[j][i] !== 1) {
      if (i === maxColIndex) {
        count++
        j++
        i = 0
      } else {
        i++
      }

      if (j === maxRowIndex && i === maxColIndex) {
        break
      }
    }
  }

  if (side === 'bottom') {
    let i = 0
    let j = maxRowIndex
    while (pattern[j][i] !== 1) {
      if (i === maxColIndex) {
        count++
        j--
        i = 0
      } else {
        i++
      }

      if (j === 0 && i === maxColIndex) {
        break
      }
    }
  }

  return count
}

export default getEmptyLines
