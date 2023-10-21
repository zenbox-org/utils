import { Result } from './index'

export const success = <Data, Error>(data: Data): Result<Data, Error> => ({ success: true, data })

export const failure = <Data, Error>(error: Error): Result<Data, Error> => ({ success: false, error })
