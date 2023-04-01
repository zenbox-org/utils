import { escapeRegExp } from 'lodash-es'

export const replaceEnd = (path: string, endPrev: string, endNext: string) => path.replace(new RegExp(`${escapeRegExp(endPrev)}$`), endNext)
