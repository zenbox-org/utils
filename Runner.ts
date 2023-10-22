import { todo } from 'libs/utils/todo'
import { Mapper, MapperP } from './Mapper'

export type Runner<Ctx, Out> = Mapper<Ctx, Out>

export type RunnerP<Ctx, Out> = MapperP<Ctx, Out>

export const TodoRunnerP = async () => todo()

export function isEveryFinished<Ctx, Val>(reports: { result: { isFinished: boolean } }[]) {
  return reports.every(r => r.result.isFinished)
}
