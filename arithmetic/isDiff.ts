import { BasicArithmetic } from '../arithmetic'

export const isDiffLt = <N>({ lt, abs, sub }: BasicArithmetic<N>) => (diffMax: N) => (a: N, b: N) => lt(diffMax)(abs(sub(a, b)))

export const isDiffGt = <N>({ gt, abs, sub }: BasicArithmetic<N>) => (diffMax: N) => (a: N, b: N) => gt(diffMax)(abs(sub(a, b)))

export const isDiffLte = <N>({ lte, abs, sub }: BasicArithmetic<N>) => (diffMax: N) => (a: N, b: N) => lte(diffMax)(abs(sub(a, b)))

export const isDiffGte = <N>({ gte, abs, sub }: BasicArithmetic<N>) => (diffMax: N) => (a: N, b: N) => gte(diffMax)(abs(sub(a, b)))
