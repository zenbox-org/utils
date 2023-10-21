import { isFailure, isSuccess, Result } from './index'

export const splitResults = <Value, Error>(results: Result<Value, Error>[]) => {
  return {
    values: results.filter(isSuccess).map(r => r.data),
    errors: results.filter(isFailure).map(r => r.error),
  }
}
