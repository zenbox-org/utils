import { Arbitrary } from 'fast-check/lib/types/check/arbitrary/definition/Arbitrary'

export type Arbitraries<Ts extends [unknown, ...unknown[]]> = {
  [K in keyof Ts]: Arbitrary<Ts[K]>
}
