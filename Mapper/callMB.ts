import { Mapper } from './index'

export const callMB = <In, Out>(mapper: Mapper<In, Out>) => (input: In | undefined) => input ? mapper(input) : undefined
