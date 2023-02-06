export const string2boolean = (value: string) => ['true', 'yes', 't', 'y', '1'].includes(value.toLowerCase())

export const boolean2string = (value: boolean) => value ? 'true' : 'false'

export const boolean2number = (value: unknown) => value ? 1 : 0

export const string2array = (value: string) => value.split(',')
