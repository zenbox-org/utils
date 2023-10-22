import { Mapper } from '../Mapper'

export const over = <From, To>(from: From) => (mapper: Mapper<From, To>) => mapper(from)
