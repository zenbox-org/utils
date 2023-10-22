import { Mapper } from '../Mapper'
import { Result } from './index'
import { failure } from './utils'

export const mapError = <InErr, OutErr>(map: Mapper<InErr, OutErr>) => <Data>(result: Result<Data, InErr>): Result<Data, OutErr> => {
  if (result.success) {
    return result
  } else {
    return failure(map(result.error))
  }
}
