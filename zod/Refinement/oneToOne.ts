import { SuperRefinement } from 'zod/lib/types'
import { Mapper } from '../../../generic/models/Mapper'
import { oneToMany } from './oneToMany'

export const oneToOne = <Database, Parent, Child, ParentId, ChildId>($parent: string, $child: string, getParents: Mapper<Database, Parent[]>, getChildren: Mapper<Database, Child[]>, getParentId: Mapper<Parent, ParentId>, getChildId: Mapper<Child, ChildId>, getParentChildId: Mapper<Parent, ChildId>, getChildParentId: Mapper<Child, ParentId>): SuperRefinement<Database> => (database, ctx) => {
  oneToMany($parent, $child, getParents, getChildren, getParentId, getChildId, getChildParentId)
  oneToMany($child, $parent, getChildren, getParents, getChildId, getParentId, getParentChildId)
}
