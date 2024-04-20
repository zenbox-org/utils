import { Mapper } from '../Mapper'
import { success } from './constructors'
import { Result } from './index'

export const reduceOverMonad = <Data, Error>(mappers: Mapper<Data, Result<Data, Error>>[]) => (result: Result<Data, Error>) => {
  return mappers.reduce((result, mapper) => {
    switch (result.success) {
      case false: return result
      case true: return mapper(result.data)
    }
  }, result)
}

export const reduceOverMonadW = <Data, Error>(mappers: Mapper<Data, Result<Data, Error>>[]) => (data: Data) => reduceOverMonad(mappers)(success(data))

export const andThen = <Data, Error>(result: Result<Data, Error>) => <Out>(mapper: Mapper<Data, Out>) => {
  if (result.success) {
    return success(mapper(result.data))
  } else {
    return result
  }
}

// export function withResults<A, M, K, N, P, D, G, C, O, L, Q, R>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>, Promise<O>, Promise<L>, Promise<Q>, Promise<R>]): Promise<[A, M, K, N, P, D, G, C, O, L, Q, R]>;
//
// export function withResults<A, M, K, N, P, D, G, C, O, L, Q>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>, Promise<O>, Promise<L>, Promise<Q>]): Promise<[A, M, K, N, P, D, G, C, O, L, Q]>;
//
// export function withResults<A, M, K, N, P, D, G, C, O, L>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>, Promise<O>, Promise<L>]): Promise<[A, M, K, N, P, D, G, C, O, L]>;
//
// export function withResults<A, M, K, N, P, D, G, C, O>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>, Promise<O>]): Promise<[A, M, K, N, P, D, G, C, O]>;
//
// export function withResults<A, M, K, N, P, D, G, C>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>]): Promise<[A, M, K, N, P, D, G, C]>;
//
// export function withResults<A, M, K, N, P, D, G>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>]): Promise<[A, M, K, N, P, D, G]>;
//
// export function withResults<A, M, K, N, P, D>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>]): Promise<[A, M, K, N, P, D]>;
//
// export function withResults<A, M, K, N, P>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>]): Promise<[A, M, K, N, P]>;
//
// export function withResults<A, M, K, N>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>]): Promise<[A, M, K, N]>;
//
// export function withResults<A, M, K>(promises: [Promise<A>, Promise<M>, Promise<K>]): Promise<[A, M, K]>;

// export const withResults = <Error, Data1, Data2>(results: [Result<Data1, Error>, Result<Data2, Error>]) => {
//   const values: [Data1, Data2] = []
//   for (const result of results) {
//     if (result.success) {
//
//     }
//   }
//   const resultWithError = results.find(r => !r.success)
//   if (resultWithError) return resultWithError
//   const values = results.map(r => r.data)
// }

// export const withResults = <Data, Error>(results: Result<Data, Error>[]) => {
//
// }

function concat<T extends unknown[], U extends unknown[]>(t: [...T], u: [...U]): [...T, ...U] {
  return [...t, ...u]
}
