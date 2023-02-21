/* eslint-disable @typescript-eslint/ban-types */
import $debug from 'debug'
import { isObject } from 'remeda'
import { NonEmptyArray } from './array/ensureNonEmptyArray'
import { getRealName } from './filesystem'
import { getBooleanEnvVar } from './process'

export const isLogEnabled = getBooleanEnvVar('LOG', process.env.LOG, false)

export function getDebug(filename: string) {
  return $debug('app').extend(getRealName(filename))
}

export function debug<Args extends NonEmptyArray<unknown>>(filename: string, func: Function, ...args: Args) {
  const d = getDebug(filename).extend(func.name)
  return d.apply(d, args)
}

export function input<Val>(filename: string, func: Function, value: Val) {
  return dbg(filename, func, 'input', value)
}

export function inner<Val>(filename: string, func: Function, value: Val) {
  return dbg(filename, func, 'inter', value)
}

export function output<Val>(filename: string, func: Function, value: Val) {
  return dbg(filename, func, 'output', value)
}

export function dbg<Val>(filename: string, func: Function, stage: string, value: Val) {
  return dbgS(filename, func.name, stage, value)
}

export function dbgS<Val>(filename: string, func: string, stage: string, value: Val) {
  const d = getDebug(filename).extend(func).extend(stage)
  switch (true) {
    case isObject(value):
      d('%o', value)
      break
    default:
      d(value)
      break
  }
  return value
}

export function peek<Data>(label: string, data: Data) {
  // eslint-disable-next-line no-console
  console.log(label, data)
  return data
}

export function show<Args extends unknown[]>(...args: Args) {
  if (isLogEnabled) console.info(...args)
}
