import { Primitive } from './typescript'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Caged = Primitive | object | null | undefined

export type Cage<Value extends Caged> = Value | (() => Value)

export type CageP<Value extends Caged> = Value | (() => Value) | (() => Promise<Value>)

export function uncage<Value extends Caged>(cage: (() => Value)): Value

export function uncage<Value extends Caged>(cage: Value): Value

export function uncage<Value extends Caged>(cage: Cage<Value>) {
  if (typeof cage === 'function') {
    return cage()
  } else {
    return cage
  }
}

export function uncageP<Value extends Caged>(cage: (() => Promise<Value>)): Promise<Value>

export function uncageP<Value extends Caged>(cage: (() => Value)): Promise<Value>

export function uncageP<Value extends Caged>(cage: Value): Promise<Value>

export async function uncageP<Value extends Caged>(cage: CageP<Value>) {
  if (typeof cage === 'function') {
    return await cage()
  } else {
    return cage
  }
}
