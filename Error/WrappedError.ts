import { Result } from '../Result'
import { mapError } from '../Result/mapError'

export interface WrappedError<Err> {
  type: 'WrappedError'
  error: Err
}

export const toWrappedError = <Err>(error: Err): WrappedError<Err> => ({ type: 'WrappedError', error })

export const wrapError: <Data, Err>(result: Result<Data, Err>) => Result<Data, WrappedError<Err>> = mapError(toWrappedError)
