import { BasicArithmetic } from '../arithmetic'

export const add = <V>(arithmetic: BasicArithmetic<V>) => <K>(a: Map<K, V>, b: Map<K, V>) => {
  const result = new Map<K, V>(a) // clone `a` to `result`
  for (const [key, bValue] of b) {
    const aValue = result.get(key)
    if (aValue !== undefined) {
      result.set(key, arithmetic.add(aValue, bValue))
    } else {
      result.set(key, bValue)
    }
  }
  return result
}
