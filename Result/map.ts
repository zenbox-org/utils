import { Mapper } from '../Mapper'
import { aggregate } from './aggregate'
import { success } from './constructors'
import { Result } from './index'

export const map = <In, Out>(mapper: Mapper<In, Out>) => <Error>(result: Result<In, Error>): Result<Out, Error> => {
  if (result.success) {
    return success(mapper(result.data))
  } else {
    return result
  }
}

export const mapMany = <In, Out>(mapper: Mapper<In[], Out>) => <Err>(results: Result<In, Err>[]) => {
  const final = aggregate(results)
  return map(mapper)(final)
}
