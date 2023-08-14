import { last } from 'remeda'
import { callMB } from '../generic/models/Mapper/callMB'
import { stringify } from './JSON'
import { getDistances } from './number'

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

export const nailMB = callMB(nail)

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

export function toStringMaybe(s: unknown) {
  if (typeof s === 'string') return s
  if (typeof s === 'bigint') return s.toString()
  if (typeof s === 'function') return s.toString()
  return undefined
}

export function toString(value: unknown): string {
  // NOTE: The following line is commented because otherwise the function returns [object Object] for regular Record<string, any>
  // if (typeof s === 'object' && s !== null && 'toString' in s && typeof s.toString === 'function') return s.toString()
  return toStringMaybe(value) || stringify(value, (key, value) => toStringMaybe(value) || value)
}

export const toStringA = (value: unknown[]) => value.map(toString)

export function stripLineAndColumnNumber(pathRaw: string) {
  return pathRaw.replace(/(:\d+)*$/, '')
}

export function replaceAt(text: string, replacement: string, start: number, end: number) {
  return text.substring(0, start) + replacement + text.substring(end)
}

interface Bounds {
  start: number
  end: number
}

export function splitAt(text: string, starts: number[]) {
  const startLast = last(starts)
  if (!startLast) return [text]
  const splinters = starts.map((startNext, index) => {
    const startPrev = index ? starts[index - 1] : 0
    return text.substring(startPrev, startNext)
  })
  splinters.push(text.substring(startLast))
  return splinters
}

export function replaceAtMulti(text: string, replacement: string, starts: number[], length: number) {
  const distances = getDistances(starts)
  const startLast = last(starts)
  if (length < 1) throw new Error('The length must be greater or equal to 1')
  if (distances.find(d => d < length)) throw new Error('Every distance between the starts must be greater than length')
  if (!startLast) throw new Error('The starts array must contain at least one element')
  const splinters = splitAt(text, starts)
  const splintersReplaced = splinters.map((subtext, index) => {
    return index ? replacement + subtext.slice(length) : subtext
  })
  return splintersReplaced.join('')
}

export const longestCommonPrefix = (strings: string[]) => {
  // check border cases
  if (strings.length === 0) { return '' }
  if (strings.length === 1) { return strings[0] }
  let i = 0
  // while all words have the same character at position i, increment i
  while (strings[0][i] && strings.every(w => w[i] === strings[0][i])) { i++ }
  // prefix is the substring from the beginning to the last successfully checked i
  return strings[0].substring(0, i)
}

