import { Mapper } from '../Mapper'
import { Result } from './index'

export const handle = <Data, Error, SuccessOut, FailureOut>(onSuccess: Mapper<Data, SuccessOut>, onFailure: Mapper<Error, FailureOut>) => (result: Result<Data, Error>) => {
  return result.success ? onSuccess(result.data) : onFailure(result.error)
}
