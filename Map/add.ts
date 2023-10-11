import { BasicArithmetic } from '../arithmetic'

export const add = <V>(arithmetic: BasicArithmetic<V>) => <K, V>(a: Map<K, V>, b: Map<K, V>) => {
  const result = new Map<K, V>()
  const allKeys = new Set([...a.keys(), ...b.keys()])
  for (const key of allKeys) {
    const aValue = a.get(key)
    const bValue = b.get(key)
    if (aValue !== undefined && bValue !== undefined) {
      result.set(key, arithmetic.add(aValue, bValue))
    } else if (aValue !== undefined) {
      result.set(key, aValue)
    } else if (bValue !== undefined) {
      result.set(key, bValue)
    }
  }
  return result
}
