export interface WrappedError<Err> {
  type: 'WrappedError'
  error: Err
}

export const toWrappedError = <Err>(error: Err): WrappedError<Err> => ({ type: 'WrappedError', error })
