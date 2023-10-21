import { Mapper } from '../../generic/models/Mapper'
import { Result } from './index'

export const mapError = <InErr, OutErr>(map: Mapper<InErr, OutErr>) => <Data>(result: Result<Data, InErr>): Result<Data, OutErr> => {
  if (result.success) {
    return result
  } else {
    return { success: false, error: map(result.error) }
  }
}
