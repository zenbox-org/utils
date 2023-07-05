import { difference } from 'remeda'
import { ZodIssueCode } from 'zod'
import { SuperRefinement } from 'zod/lib/types'
import { getId, Id } from '../../../generic/models/Id'
import { Mapper } from '../../../generic/models/Mapper'

export const oneToMany = <Database, Parent, Child, ParentId, ChildId>($parent: string, $child: string, getParents: Mapper<Database, Parent[]>, getChildren: Mapper<Database, Child[]>, getParentId: Mapper<Parent, ParentId>, getChildId: Mapper<Child, ChildId>, getChildParentId: Mapper<Child, ParentId>): SuperRefinement<Database> => (database, ctx) => {
  const parents = getParents(database)
  const children = getChildren(database)
  for (const child of children) {
    const parentId = getChildParentId(child)
    const parent = parents.find(p => getParentId(p) === parentId)
    if (!parent) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `${$child} #${getChildId(child)} is linked to ${$parent} #${parentId}, but ${$parent} #${parentId} does not exist`,
        params: {
          child,
        },
      })
    }
  }
}

export const oneToManyWithId = <Database, Parent extends { id: Id }, Child extends { id: Id }>($parent: string, $child: string, getParents: Mapper<Database, Parent[]>, getChildren: Mapper<Database, Child[]>, getChildParentId: Mapper<Child, Id>): SuperRefinement<Database> => (database, ctx) => {
  return oneToMany($parent, $child, getParents, getChildren, getId, getId, getChildParentId)
}

export const oneToManySimple = <Val, Id>($source: string, $target: string, getSourceIds: (value: Val) => Id[], getTargetIds: (value: Val) => Id[]): SuperRefinement<Val> => (value, ctx) => {
  const sourceIds = getSourceIds(value)
  const targetIds = getTargetIds(value)
  for (const targetId in targetIds) {
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
}
