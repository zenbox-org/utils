export const getDistances = (values: number[]): number[] => {
  const result: number[] = []
  for (let i = 1; i < values.length; i++) {
    result.push(values[i]! - values[i - 1]!)
  }
  return result
}
