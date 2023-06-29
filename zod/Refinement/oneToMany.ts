import { difference } from 'remeda'
import { ZodIssueCode } from 'zod'
import { SuperRefinement } from 'zod/lib/types'

export const oneToMany = <Val, Id>(getSourceIds: (value: Val) => Id[], getTargetIds: (value: Val) => Id[]): SuperRefinement<Val> => (value, ctx) => {
  const sourceIds = getSourceIds(value)
  const targetIds = getTargetIds(value)
  const diff = difference(targetIds, sourceIds)
  if (diff.length) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Some values are present in target but not present in source',
      params: {
        diff,
      },
    })
  }
}
