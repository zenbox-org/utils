import { WithTernaryComparisons } from '../arithmetic'
import { CheckByBinary, CheckByUnary } from '../assert'

export const getTernaryChecks = <UnaryOut, BinaryOut, N>(checkByUnary: CheckByUnary<UnaryOut, N>, checkByBinary: CheckByBinary<BinaryOut, N, N>) => ({ gtelte, gtlte, gtelt, gtlt }: WithTernaryComparisons<N>) => ({
  gtelte: (lower: N, upper: N) => checkByUnary(gtelte(lower, upper), `gtelte(${lower}, ${upper})`),
  gtlte: (lower: N, upper: N) => checkByUnary(gtlte(lower, upper), `gtlte(${lower}, ${upper})`),
  gtelt: (lower: N, upper: N) => checkByUnary(gtelt(lower, upper), `gtelt(${lower}, ${upper})`),
  gtlt: (lower: N, upper: N) => checkByUnary(gtlt(lower, upper), `gtlt(${lower}, ${upper})`),
})
