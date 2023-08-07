import voca from 'voca'

const { capitalize, snakeCase } = voca

/**
 * Assuming the function name start with a verb
 * @param func
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getNameFromFunction(func: Function) {
  return capitalize(snakeCase(func.name).split('_').slice(1).join('_'))
}
