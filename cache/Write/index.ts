import { MapperP } from '../../Mapper'

export type Write<Key, Data> = (key: Key) => MapperP<Data, void>
