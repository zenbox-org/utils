import { Mapper, MapperP } from './Mapper'

export type Modifier<Val> = Mapper<Val, Val>

export type ModifierP<Val> = MapperP<Val, Val>

export type ModifierVariadic<Val, Args extends unknown[]> = (obj: Val, ...args: Args) => Val

export type ModifierVariadicPromisified<Val, Args extends unknown[]> = (obj: Val, ...args: Args) => Promise<Val>

export type ModifierV<Val, Args extends unknown[]> = ModifierVariadic<Val, Args>

export type ModifierVP<Val, Args extends unknown[]> = ModifierVariadicPromisified<Val, Args>
