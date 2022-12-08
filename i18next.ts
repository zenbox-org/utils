import { TFunction } from 'i18next'

// export function withNamespace(t: TFunction, ns: string): TFunction {
//   return (key, defaultValue?, options?) => {
//     const $defaultValue = typeof defaultValue === 'string' ? defaultValue : undefined
//     const $options = typeof defaultValue === 'string' ? options : defaultValue
//     const $$options = typeof $options === 'object' ? $options : {}
//     return t(key, $defaultValue, { ...($$options ?? {}), ns })
//   }
// }

// export function withNamespaces(t: TFunction, nses: string[]) {
//   return nses.map(ns => withNamespace(t, ns))
// }

export const mergeTranslation = <Translation extends object>(t: TFunction, prefix: string) => <Obj extends { key: string }>(object: Obj) => ({
  ...object,
  ...t<string, Translation>(`${prefix}.${object.key}`, { returnObjects: true }),
})
