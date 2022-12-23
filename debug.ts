import { getBooleanEnvVar } from './process'

export function passlog<Data>(label: string, data: Data) {
  console.log(label, data)
  return data
}

const isEnabledLog = getBooleanEnvVar('LOG', process.env.LOG)

export function show<Args extends unknown[]>(...args: Args) {
  if (isEnabledLog) console.info(...args)
}
