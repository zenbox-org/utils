import { BasicArithmetic } from '../arithmetic'
import { setDenominator } from './setDenominator'

export const getNativeOperations = <N>(arithmetic: BasicArithmetic<N>) => ({
  setDenominator: setDenominator(arithmetic),
})
