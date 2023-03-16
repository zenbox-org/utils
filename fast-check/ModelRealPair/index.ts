import { equals } from 'remeda'
import { FilterTwo } from '../../../generic/models/Filter'
import { ensureFind } from '../../ensure'

interface ModelRealPair<M, R> {
  model: M
  real: R
}

type ModelRealPairSymmetric<T> = ModelRealPair<T, T>

export type MRP<M, R> = ModelRealPair<M, R>

export type MRPS<T> = ModelRealPairSymmetric<T>

export const getRealFromModelBy = <M>(filter: FilterTwo<M, M>) => (model: M) => <R>(pairs: MRP<M, R>[]) => ensureFind(pairs, p => filter(p.model, model)).real

export const getRealFromModel = getRealFromModelBy(equals)

export const getModelFromRealBy = <R>(filter: FilterTwo<R, R>) => (real: R) => <M>(pairs: MRP<M, R>[]) => ensureFind(pairs, p => filter(p.real, real)).model

export const getModelFromReal = getModelFromRealBy(equals)
