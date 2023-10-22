import { GetterP } from '../../Getter'
import { MapperP } from '../../Mapper'

export type Read<Key, Data> = MapperP<Key, Data>

export type ReadKey<Data> = GetterP<Data>
