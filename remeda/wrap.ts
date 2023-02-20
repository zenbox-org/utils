import { createPipe, identity } from 'remeda'
import { Mutator } from '../../generic/models/Mutator'

export const wrap = <Value>(pre: Mutator<Value> = identity, post: Mutator<Value> = identity) => (f: Mutator<Value>) => createPipe(pre, f, post)

export const before = <Value>(pre: Mutator<Value>) => (f: Mutator<Value>) => createPipe(pre, f)

export const after = <Value>(post: Mutator<Value>) => (f: Mutator<Value>) => createPipe(f, post)
