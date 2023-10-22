import { clone, range } from 'remeda'
import { Mapper } from '../Mapper'

export const repeatBy = <V>(clone: Mapper<V, V>) => (times: number, value: V) => range(0, times).map(_ => clone(value))

export const repeat = repeatBy(clone)
