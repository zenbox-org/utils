import voca from 'voca'

const { kebabCase, titleCase } = voca

export function humanize(functionName: string) {
  return titleCase(kebabCase(functionName)).replace(/-/g, ' ')
}
