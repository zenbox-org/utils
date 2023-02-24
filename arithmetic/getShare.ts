import { Arithmetic } from '../arithmetic'

// export function getShare<N>(value: N, numerator: N, denominator: N | undefined, arithmetic: Arithmetic<N>): N
//
// export function getShare<N>(numerator: N, denominator: N | undefined, arithmetic: Arithmetic<N>): (value: N) => N
//
// export function getShare<N>(denominator: N | undefined, arithmetic: Arithmetic<N>): (numerator: N) => (value: N) => N
//
// export function getShare<N>(arithmetic: Arithmetic<N>): (denominator: N | undefined) => (numerator: N) => (value: N) => N
//
// export function getShare<N>() {
//   console.log('arguments', arguments)
//   return purry(function <N> (value: N, numerator: N, denominator: N | undefined, arithmetic: Arithmetic<N>) {
//     const { mul, div, num } = arithmetic
//     return div(mul(value, numerator), denominator || num(100))
//   }, arguments)
// }

export const getShare = <N>({ mul, div, num }: Arithmetic<N>) => (denominator: N = num(100)) => (numerator: N) => (value: N) => div(mul(value, numerator), denominator)
