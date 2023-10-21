import { Result, ResultFailure, ResultSuccess } from './index'

export const isSuccess = <Value, Error>(result: Result<Value, Error>): result is ResultSuccess<Value> => result.success

export const isFailure = <Value, Error>(result: Result<Value, Error>): result is ResultFailure<Error> => !result.success
