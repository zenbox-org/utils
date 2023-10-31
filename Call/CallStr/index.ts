import { Call } from '../index'

export type CallStr = Call<string, string[]>

export const String$CallStr = ({ fun, args }: CallStr) => String$CallStr$spread(fun, args)

export const String$CallStr$spread = (fun: string, args: string[]) => `${fun}(${args.join(', ')})`
