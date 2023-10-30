import { Mapper } from '../Mapper'
import { failure } from './constructors'
import { Result } from './index'

export const mapError = <InErr, OutErr>(map: Mapper<InErr, OutErr>) => <Data>(result: Result<Data, InErr>): Result<Data, OutErr> => {
  if (result.success) {
    return result
  } else {
    return failure(map(result.error))
  }
}
