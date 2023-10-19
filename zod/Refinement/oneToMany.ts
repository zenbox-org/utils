import { difference, isDefined } from 'remeda'
import { ZodIssueCode } from 'zod'
import { SuperRefinement } from 'zod/lib/types'
import { getId, Id, WithId } from '../../../generic/models/Id'
import { Mapper } from '../../../generic/models/Mapper'
import { parallelMap } from '../../promise'
import { ToString } from '../../string'

export const oneToMany = <Database, Parent, Child, ParentId, ChildId>($parent: string, $child: string, getParents: Mapper<Database, Parent[]>, getChildren: Mapper<Database, Child[]>, getParentId: Mapper<Parent, ParentId>, getChildId: Mapper<Child, ChildId>, getChildParentId: Mapper<Child, ParentId>): SuperRefinement<Database> => (database, ctx) => {
  const parents = getParents(database)
  const children = getChildren(database)
  // const getParentById = (database: Database, parentId: ParentId) => parents.find(p => getParentId(p) === parentId)
  // const getChildren = todo()
  // const childrenWithoutParents = getChildrenWithoutParents({ iDatabase: { getChildren, getParentById } })
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

export const oneToManyArray = <Database, Parent, Child, ParentId, ChildId>($parent: string, $child: string, getParents: Mapper<Database, Parent[]>, getChildren: Mapper<Database, Child[]>, getParentId: Mapper<Parent, ParentId>, getChildId: Mapper<Child, ChildId>, getChildParentIds: Mapper<Child, ParentId[]>): SuperRefinement<Database> => (database, ctx) => {
  const parents = getParents(database)
  const children = getChildren(database)
  for (const child of children) {
    const parentIdsAll = getChildParentIds(child)
    const parentIdsWithoutParent = parentIdsAll.filter(parentId => !parents.find(p => getParentId(p) === parentId))
    if (parentIdsWithoutParent.length) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `${$child} #${getChildId(child)} is linked to ${$parent} ${parentIdsWithoutParent.map(parentId => `#${parentId}`)}, but these parents do not exist`,
        params: {
          child,
          parentIdsWithoutParent,
        },
      })
    }
  }
}

export const oneToManyWithId = <Database, Parent extends { id: Id }, Child extends { id: Id }>($parent: string, $child: string, getParents: Mapper<Database, Parent[]>, getChildren: Mapper<Database, Child[]>, getChildParentId: Mapper<Child, Id>): SuperRefinement<Database> => (database, ctx) => {
  return oneToMany($parent, $child, getParents, getChildren, getId, getId, getChildParentId)
}

export const oneToManyArrayWithId = <Database, Parent extends { id: Id }, Child extends { id: Id }>($parent: string, $child: string, getParents: Mapper<Database, Parent[]>, getChildren: Mapper<Database, Child[]>, getChildParentIds: Mapper<Child, Id[]>): SuperRefinement<Database> => (database, ctx) => {
  return oneToManyArray($parent, $child, getParents, getChildren, getId, getId, getChildParentIds)
}

export const oneToManySimple = <Val, Id>($source: string, $target: string, getSourceIds: (value: Val) => Id[], getTargetIds: (value: Val) => Id[]): SuperRefinement<Val> => (value, ctx) => {
  const diff = getOneToManyDiff(getSourceIds, getTargetIds)(value)
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

export const getOneToManyDiff = <Val, Id>(getSourceIds: (value: Val) => Id[], getTargetIds: (value: Val) => Id[]) => (value: Val) => {
  const sourceIds = getSourceIds(value)
  const targetIds = getTargetIds(value)
  return difference(targetIds, sourceIds)
}

export const getChildrenWithoutParents = <Database, Parent, Child, ParentId>(
  getChildren: (database: Database) => Promise<Child[]>,
  getParentById: (database: Database, parentId: ParentId) => Promise<Parent | undefined>,
  getChildParentId: (child: Child) => ParentId,
) => async (database: Database) => {
    const children = await getChildren(database)
    const results = await parallelMap(children, async (child) => {
      const parentId = getChildParentId(child)
      const parent = await getParentById(database, parentId)
      return parent ? undefined : child
    })
    return results.filter(isDefined)
  }

export interface OneToManyError<ParentId, ChildId> {
  $parent: string
  $child: string
  parentId: ParentId
  childId: ChildId
}

export const getOneToManyErrors = <Database, Parent, Child, ParentId, ChildId>(
  $parent: string,
  $child: string,
  getChildren: (database: Database) => Promise<Child[]>,
  getParentById: (database: Database, parentId: ParentId) => Promise<Parent | undefined>,
  getChildParentId: (child: Child) => ParentId,
  getChildId: (child: Child) => ChildId
) => async (database: Database): Promise<OneToManyError<ParentId, ChildId>[]> => {
    const children = await getChildrenWithoutParents(getChildren, getParentById, getChildParentId)(database)
    return children.map(child => ({
      $parent,
      $child,
      parentId: getChildParentId(child),
      childId: getChildId(child),
    }))
  }

export const getOneToManyErrorsWithId = <Database, Parent extends WithId, Child extends WithId>(
  $parent: string,
  $child: string,
  getParents: (database: Database) => Promise<Parent[]>,
  getChildren: (database: Database) => Promise<Child[]>,
) => async (database: Database) => {
    const parents = await getParents(database)
    const getParentById = async (database: Database, parentId: Id) => parents.find(parent => parent.id === parentId)
    return getOneToManyErrors($parent, $child, getChildren, getParentById, getId, getId)
  }

const toStringOneToManyError = <ParentId, ChildId>(toStringChildId: ToString<ChildId>, toStringParentId: ToString<ParentId>) => ({ $child, $parent, childId, parentId }: OneToManyError<ParentId, ChildId>) => {
  const $parentId = toStringParentId(parentId)
  const $childId = toStringChildId(childId)
  return `${$child} #${$childId} is linked to ${$parent} #${$parentId}, but ${$parent} #${$parentId} does not exist`
}
