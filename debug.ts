import { getBooleanEnvVar } from './process'
import $debug from 'debug'
import { realname } from '../../util/filesystem'

export function getDebug(filename: string) {
  return $debug('app').extend(realname(filename))
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function debug(filename: string, func: Function, ...args: [unknown, ...unknown[]]) {
  const d = getDebug(filename).extend(func.name)
  return d.apply(d, args)
}

export function passlog<Data>(label: string, data: Data) {
  console.log(label, data)
  return data
}

export const isEnabledLog = getBooleanEnvVar('LOG', process.env.LOG)

export function show<Args extends unknown[]>(...args: Args) {
  if (isEnabledLog) console.info(...args)
}
