import { purry } from 'remeda'
import { BasicArithmetic, BasicType, HeteroBasicOperations } from '../arithmetic'
import { Quotient } from './index'

export const getQuotientHeteroBasicOperations = <N>({ one }: BasicType<N>) => ({ add, sub, mul, div, abs, mod, fromNumber }: BasicArithmetic<Quotient<N>>): HeteroBasicOperations<Quotient<N>, N, Quotient<N>> => ({
  add() {
    return purry((a: Quotient<N>, b: N) => add(a, { numerator: b, denominator: one }), arguments)
  },
  sub() {
    return purry((a: Quotient<N>, b: N) => sub(a, { numerator: b, denominator: one }), arguments)
  },
  mul() {
    return purry((a: Quotient<N>, b: N) => mul(a, { numerator: b, denominator: one }), arguments)
  },
  div() {
    return purry((a: Quotient<N>, b: N) => div(a, { numerator: b, denominator: one }), arguments)
  },
  mod() {
    return purry((a: Quotient<N>, b: N) => mod(a, { numerator: b, denominator: one }), arguments)
  },
})
