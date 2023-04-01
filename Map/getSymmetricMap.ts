import { stringify } from '../JSON'

export function getSymmetricMap<A, B>(forward: Map<A, B>) {
  const result: Map<B, A> = new Map()
  const entries = forward.entries()
  for (const entry of entries) {
    const [from, to] = entry
    if (result.has(to)) throw new Error(`Duplicate key detected: ${stringify(to)}`)
    result.set(to, from)
  }
  return result
}
