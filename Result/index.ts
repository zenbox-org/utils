/**
 * Using "data" name for compatibility with Zod
 */
export interface ResultSuccess<Data> {
  success: true
  data: Data
}

export interface ResultFailure<Error> {
  success: false
  error: Error
}

export type Result<Data, Error> = ResultSuccess<Data> | ResultFailure<Error>
