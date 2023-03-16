import { purry } from 'remeda'
import { BasicArithmetic } from '../arithmetic'
import { todo } from '../todo'
import { Quotient } from './index'

export const getQuotientBasicArithmetic = <N>({ zero, one, fromNumber, fromString, abs, add, sub, mul, div, eq, lt, gt, lte, gte }: BasicArithmetic<N>): BasicArithmetic<Quotient<N>> => ({
  zero: { numerator: zero, denominator: one },
  one: { numerator: one, denominator: one },
  fromNumber(a) {
    return { numerator: fromNumber(a), denominator: abs(fromNumber(a)) }
  },
  fromString(a) {
    return { numerator: fromString(a), denominator: abs(fromString(a)) }
  },
  add() {
    return purry((a: Quotient<N>, b: Quotient<N>) => ({
      numerator: add(mul(a.numerator, b.denominator), mul(b.numerator, a.denominator)),
      denominator: mul(a.denominator, b.denominator),
    }), arguments)
  },
  sub() {
    return todo()
  },
  mul() {
    return todo()
  },
  /* IMPORTANT: This is integer division. The actual result will be always less than or equal to the expected result: mul(div(a, b), b) <= a */
  div() {
    return todo()
  },
  mod() {
    return todo()
  },
  min() {
    return todo()
  },
  max() {
    return todo()
  },
  abs(a) {
    return todo()
  },
  sqrt(a) {
    return todo()
  },
  eq() {
    return purry((a: Quotient<N>, b: Quotient<N>) => eq(mul(a.numerator, b.denominator), mul(b.numerator, a.denominator)), arguments)
  },
  lt() {
    return purry((a: Quotient<N>, b: Quotient<N>) => lt(mul(a.numerator, b.denominator), mul(b.numerator, a.denominator)), arguments)
  },
  gt() {
    return purry((a: Quotient<N>, b: Quotient<N>) => gt(mul(a.numerator, b.denominator), mul(b.numerator, a.denominator)), arguments)
  },
  lte() {
    return purry((a: Quotient<N>, b: Quotient<N>) => lte(mul(a.numerator, b.denominator), mul(b.numerator, a.denominator)), arguments)
  },
  gte() {
    return purry((a: Quotient<N>, b: Quotient<N>) => gte(mul(a.numerator, b.denominator), mul(b.numerator, a.denominator)), arguments)
  },
})
