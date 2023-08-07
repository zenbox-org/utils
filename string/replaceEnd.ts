import voca from 'voca'

const { escapeRegExp } = voca

export const replaceEnd = (path: string, endPrev: string, endNext: string) => path.replace(new RegExp(`${escapeRegExp(endPrev)}$`), endNext)
