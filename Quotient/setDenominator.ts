import { pipe } from 'remeda'
import { HomoBasicOperations } from '../arithmetic'
import { Quotient } from './index'

export const setDenominator = <N>({ mul, div }: HomoBasicOperations<N>) => (denominatorNew: N) => ({ numerator, denominator }: Quotient<N>) => ({
  numerator: pipe(numerator, mul(denominatorNew), div(denominator)),
  denominator: pipe(denominator, mul(denominatorNew), div(denominator)),
})
