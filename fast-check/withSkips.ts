import { pre } from 'fast-check'
import { AssertionFailedError } from '../error'

export function withSkips<Inputs extends unknown[], Output>(fn: (...inputs: Inputs) => Output) {
  return function (...inputs: Inputs) {
    try {
      return fn(...inputs)
    } catch (e) {
      if (e instanceof AssertionFailedError) {
        pre(false) // skip the test
        return undefined
      } else {
        throw e
      }
    }
  }
}
