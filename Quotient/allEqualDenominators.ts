import { allEqual } from '../remeda/allEqual'
import { Quotient } from './index'

export const allEqualDenominators = <N>(quotients: Quotient<N>[]) => allEqual(quotients.map(q => q.denominator))
