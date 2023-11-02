import { Mapper } from './index'

export const getPairFromOne = <In, Out1, Out2>(get1: Mapper<In, Out1>, get2: Mapper<In, Out2>) => (input: In): [Out1, Out2] => [get1(input), get2(input)]
