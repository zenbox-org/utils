
export const trim = <T>(filter: (value: T) => boolean) => (array: T[]) => {
  let start = 0
  let end = array.length
  while (start < end && filter(array[start])) start++
  while (end > start && filter(array[end - 1])) end--
  return array.slice(start, end)
}

export const trimLeft = <T>(filter: (value: T) => boolean) => (array: T[]): T[] => {
  for (let i = 0; i < array.length; i++) {
    if (!filter(array[i])) {
      return array.slice(i)
    }
  }
  return []
}

export const trimRight = <T>(filter: (value: T) => boolean) => (array: T[]): T[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (!filter(array[i])) {
      return array.slice(0, i)
    }
  }
  return []
}
