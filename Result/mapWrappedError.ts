import { toWrappedError, WrappedError } from '../Error/WrappedError'
import { Result } from './index'
import { mapError } from './mapError'

export const mapWrappedError: <Data, Error>(result: Result<Data, Error>) => Result<Data, WrappedError<Error>> = mapError(toWrappedError)
