import { Evolver } from './index'

export const evolveTimes = (max: number) => <A>(evolve: Evolver<A>) => (a: A) => {
  let result = a
  for (let i = 0; i < max; i++) {
    result = evolve(result)
  }
  return result
}
