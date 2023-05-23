/* eslint-disable @typescript-eslint/ban-types */
import { stringify } from './JSON'
import { getMoniker } from './moniker'
import { toString } from './string'

export class CustomError<T> extends Error {
  constructor(public message: string, public props: T) {
    // toString() should take care of displaying a proper message
    super(message)
    // assign props after message, so that the message is displayed first in toString()
    this.props = props
  }

  toJSONProps(replacer?: (this: unknown, key: string, value: unknown) => unknown) {
    return stringify(this.props, replacer)
  }

  // NOTE: Don't redefine toJSON() as `return stringifyError(this)`, because this leads to infinite recursion
}

export class AssertionFailedError<T> extends CustomError<T> {
  constructor(public props: T) {
    super('', props)
    this.message = this.constructor.name + ' ' + toString(props)
  }
}

export class CompositeError extends Error {
  constructor(public errors: Error[]) {
    super('Multiple errors occurred: \n\n' + errors.map(e => `- ${e}`).join('\n'))
  }
}

export class WrappedError extends Error {
  /**
   * All public properties are displayed automatically when the error is stringified
   */
  constructor(public message: string, public props: object, public error: Error) {
    super(message)
  }
}

export class InfoError<T> extends Error {
  /**
   * All public properties are displayed automatically when the error is stringified
   */
  constructor(public message: string, public info: T, public code: number) {
    super(message)
  }
}

export class ErrorWithDescription extends Error {
  constructor(public message: string, public description: string) {
    super(message)
  }
}

export class IndexedError<Val, Err extends Error> extends Error {
  constructor(public value: Val, public index: number, public error: Err) {
    super(`At index ${index} for ${getMoniker(value)}: ${error.toString()}`)
  }
}

export interface WithStack {
  stack: string
}

export function hasStack(obj: object): obj is WithStack {
  return 'stack' in obj
}
