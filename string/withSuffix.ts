export const withSuffix = ($name: string, $suffix: string) => $suffix ? $name + ' ' + $suffix : $name

// eslint-disable-next-line @typescript-eslint/ban-types
export const withSuffixF = (func: Function, $suffix: string) => withSuffix(func.name, $suffix)
