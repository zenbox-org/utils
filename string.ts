export interface WithToString {
  toString: () => string
}

export type StringLike = string | WithToString

/**
 * Removes spaces at the beginning of each line (allows to indent multiline strings in code, then remove this indent via `nail()` call)
 * @see ./string.test.ts
 */
export function nail(str: string) {
  const spacesAtStart = str.match(/^\n(\s+)/)
  if (spacesAtStart) {
    return str.replace(new RegExp(`^[^\\S\r\n]{0,${spacesAtStart[1].length}}`, 'gm'), '')
  } else {
    return str
  }
}

export function adjust(str: string) {
  return nail(str).trim()
}

export function indent(count: number, str: string) {
  const padding = ' '.repeat(count)
  return str.split('\n').map(s => padding + s).join('\n')
}

export function replaceInFirstLine(haystack: string, needle: string, replacement: string) {
  const lines = haystack.split('\n')
  lines[0] = lines[0].replace(needle, replacement)
  return lines.join('\n')
}

export function getLines(text: string) {
  return text.split('\n')
}

export function toString(s: StringLike) {
  return typeof s === 'string' ? s : s.toString()
}
