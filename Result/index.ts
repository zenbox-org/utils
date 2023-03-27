export interface ResultSuccess<Value> {
  success: true
  value: Value
}

export interface ResultFailure<Error> {
  success: false
  error: Error
}

export type Result<Value, Error> = ResultSuccess<Value> | ResultFailure<Error>

export const isSuccess = <Value, Error>(result: Result<Value, Error>): result is ResultSuccess<Value> => result.success

export const isFailure = <Value, Error>(result: Result<Value, Error>): result is ResultFailure<Error> => !result.success
