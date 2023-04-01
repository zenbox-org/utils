import { purry } from 'remeda'
import { BasicArithmetic } from '../arithmetic'

export const DateBasicArithmetic: BasicArithmetic<Date> = {
  zero: new Date(0),
  one: new Date(1),
  fromNumber(a) {
    return new Date(a)
  },
  fromString(a) {
    return new Date(a)
  },
  add() {
    return purry((a: Date, b: Date) => new Date(a.getTime() + b.getTime()), arguments)
  },
  sub() {
    return purry((a: Date, b: Date) => new Date(a.getTime() - b.getTime()), arguments)
  },
  mul() {
    return purry((a: Date, b: Date) => new Date(a.getTime() * b.getTime()), arguments)
  },
  div() {
    return purry((a: Date, b: Date) => new Date(a.getTime() / b.getTime()), arguments)
  },
  mod() {
    return purry((a: Date, b: Date) => new Date(a.getTime() % b.getTime()), arguments)
  },
  min() {
    return purry((a: Date, b: Date) => a < b ? a : b, arguments)
  },
  max() {
    return purry((a: Date, b: Date) => a > b ? a : b, arguments)
  },
  abs(a: Date) {
    return a
  },
  sqrt(a: Date) {
    return new Date(Math.sqrt(a.getTime()))
  },
  eq() {
    return purry((a: Date, b: Date) => a === b, arguments)
  },
  lt() {
    return purry((a: Date, b: Date) => a < b, arguments)
  },
  gt() {
    return purry((a: Date, b: Date) => a > b, arguments)
  },
  lte() {
    return purry((a: Date, b: Date) => a <= b, arguments)
  },
  gte() {
    return purry((a: Date, b: Date) => a >= b, arguments)
  },
}

export const { zero, one, fromNumber, fromString, add, sub, mul, div, mod, min, max, abs, sqrt, eq, lt, gt, lte, gte } = DateBasicArithmetic
