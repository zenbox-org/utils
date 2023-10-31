import { NonEmptyArray } from './index'

export const firstNE = <V>(values: NonEmptyArray<V>) => values[0]
