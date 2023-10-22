/**
 * Mutilator changes the value in-place without returning a new value
 */

export type Mutilator<Val> = (value: Val) => void

export type MutilatorPromisified<Val> = (value: Val) => Promise<void>

export type MutilatorVariadic<Val, Args extends unknown[]> = (obj: Val, ...args: Args) => void

export type MutilatorVariadicPromisified<Val, Args extends unknown[]> = (obj: Val, ...args: Args) => Promise<void>

export type MutilatorP<Val> = MutilatorPromisified<Val>

export type MutilatorV<Val, Args extends unknown[]> = MutilatorVariadic<Val, Args>

export type MutilatorVP<Val, Args extends unknown[]> = MutilatorVariadicPromisified<Val, Args>
