import { getHumanName } from './filesystem'

export function getCommandName(filename: string, args: string[] = []) {
  const cmdName = getHumanName(filename)
  const argNames = args.map(arg => `<${arg}>`).join(' ')
  const names = [cmdName, ...argNames]
  return names.join(' ')
}
