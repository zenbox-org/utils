import { getBooleanEnvVar } from './process'
import $debug from 'debug'
import { getRealName } from './filesystem'

export const isEnabledLog = getBooleanEnvVar('LOG', process.env.LOG, false)

export function getDebug(filename: string) {
  return $debug('app').extend(getRealName(filename))
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function debug(filename: string, func: Function, ...args: [unknown, ...unknown[]]) {
  const d = getDebug(filename).extend(func.name)
  return d.apply(d, args)
}

export function peek<Data>(label: string, data: Data) {
  // eslint-disable-next-line no-console
  console.log(label, data)
  return data
}

export function show<Args extends unknown[]>(...args: Args) {
  if (isEnabledLog) console.info(...args)
}
