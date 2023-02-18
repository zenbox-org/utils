import { camelCase } from 'lodash-es'
import papaparse, { ParseConfig } from 'papaparse'
import { assertEq } from './assert'

const { parse: parseOriginal } = papaparse

export async function parseCSV<T = unknown>(contents: string, config: ParseConfig<T> = {}) {
  const result = await parseOriginal<T>(contents.trim(), {
    header: true,
    transformHeader: camelCase,
    ...config,
  })
  assertEq(result.errors, [], 'result.errors')
  return result.data
}

export function getPapaparseDefaultConfig<T = unknown, TInput = undefined>(): ParseConfig<T, TInput> {
  return {
    header: true,
    transformHeader: camelCase,
  }
}

export const transformHeaderFromRecord = (headers: Record<string, string>) => (header: string, index: number) => {
  return headers[header] || camelCase(header)
}
