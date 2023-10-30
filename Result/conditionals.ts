import { failure, success } from './constructors'

export const failureIfDefined = <T, Data>(value: T | undefined, otherwise = undefined) => value ? failure(value) : success(otherwise)

export const successIfDefined = <T, Error>(value: T | undefined, otherwise = undefined) => value ? success(value) : failure(otherwise)
