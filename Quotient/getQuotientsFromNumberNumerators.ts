import { pipe } from 'remeda'
import { BasicArithmetic } from '../arithmetic'
import { getQuotientsFromNumerators } from './getQuotientsFromNumerators'

export const getQuotientsFromNumberNumerators = <N>(arithmetic: BasicArithmetic<N>) => (numerators: number[]) => pipe(
  numerators.map(arithmetic.fromNumber),
  getQuotientsFromNumerators(arithmetic),
)
