import { map, pipe } from 'remeda'
import { Mapper, MapperTwo } from './Mapper'
import { Repr } from './Repr'

export interface ReprValue<V> {
  value: V
  repr: Repr
}

export const mkReprValueExplicit = <V>(toString: Mapper<V, string>) => (value: V, name: string): ReprValue<V> => ({ value, repr: { name, value: toString(value) } })

type WithToString<V> = { toString: (this: V) => string }

export const mkReprValueImplicit = <V extends WithToString<V>>(value: V, name: string): ReprValue<V> => ({ value, repr: { name, value: value.toString() } })

export const mkReprValueNamedImplicit = <V extends { name: string, toString: (this: V) => string }>(value: V): ReprValue<V> => ({ value, repr: { name: value.name, value: value.toString() } })

export const mkReprValueFunc = mkReprValueNamedImplicit

export const rvi = mkReprValueImplicit

export const rve = mkReprValueExplicit

export const rvf = mkReprValueFunc
// <A, B>(value: Mapper<A, B>): ReprValue<Mapper<A, B>> => ({ repr: { name: value.name, value: value.toString() }, value })

/**
 * TODO: doesn't support the types fully
 */
export const getReprValuesObject = <Val extends WithToString<Val>, R extends Record<string, Val>>(record: R): Record<keyof R, unknown> => {
  return pipe(
    record,
    Object.entries,
    map(([key, value]) => [key, rvi(value, key)]),
    Object.fromEntries
  )
}

export const mkReprValueOfMapper = <In1, Out>(fun: ReprValue<Mapper<In1, Out>>, in1: ReprValue<In1>) => ({
  value: fun.value(in1.value),
  repr: {
    name: `${fun.repr.name}(${in1.repr.name})`,
    value: `${fun.repr.name}(${in1.repr.value})`,
  },
})

/**
 * But it doesn't show the value of the function (which might or might not be relevant)
 */
export const mkReprValueOfMapperTwo = <In1, In2, Out>(fun: ReprValue<MapperTwo<In1, In2, Out>>, in1: ReprValue<In1>, in2: ReprValue<In2>) => ({
  value: fun.value(in1.value, in2.value),
  repr: {
    name: `${fun.repr.name}(${in1.repr.name}, ${in2.repr.name})`,
    value: `${fun.repr.name}(${in1.repr.value}, ${in2.repr.value})`,
  },
})

export const callMapper = mkReprValueOfMapper

export const callMapperTwo = mkReprValueOfMapperTwo

const example1 = `
  * gt(a, b)
    * gt = (a: bigint, b: bigint) => a > b
    * a = 42
    * b = 0 
`
