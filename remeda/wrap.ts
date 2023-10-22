import { createPipe, identity } from 'remeda'
import { Modifier } from '../Modifier'

export const wrap = <Value>(pre: Modifier<Value> = identity, post: Modifier<Value> = identity) => (f: Modifier<Value>) => createPipe(pre, f, post)

export const before = <Value>(pre: Modifier<Value>) => (f: Modifier<Value>) => createPipe(pre, f)

export const after = <Value>(post: Modifier<Value>) => (f: Modifier<Value>) => createPipe(f, post)
