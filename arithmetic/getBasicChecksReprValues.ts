import { ReprValue, rvi } from '../ReprValue'
import { WithToString } from '../string'
import { BasicChecks } from './getBasicChecks'

export interface BasicChecksReprValues<UnaryOut, BinaryOut, N> {
  byOneR: ReprValue<BasicChecks<UnaryOut, BinaryOut, N>['byOne']>,
  byTwoR: ReprValue<BasicChecks<UnaryOut, BinaryOut, N>['byTwo']>,
  eqR: ReprValue<BasicChecks<UnaryOut, BinaryOut, N>['eq']>,
  ltR: ReprValue<BasicChecks<UnaryOut, BinaryOut, N>['lt']>,
  gtR: ReprValue<BasicChecks<UnaryOut, BinaryOut, N>['gt']>,
  lteR: ReprValue<BasicChecks<UnaryOut, BinaryOut, N>['lte']>,
  gteR: ReprValue<BasicChecks<UnaryOut, BinaryOut, N>['gte']>,
}

export const getBasicChecksReprValues = <UnaryOut extends WithToString, BinaryOut extends WithToString, N>({ byOne, byTwo, eq, lt, gt, lte, gte }: BasicChecks<UnaryOut, BinaryOut, N>): BasicChecksReprValues<UnaryOut, BinaryOut, N> => ({
  byOneR: rvi(byOne, 'byOne'),
  byTwoR: rvi(byTwo, 'byTwo'),
  eqR: rvi(eq, 'eq'),
  ltR: rvi(lt, 'lt'),
  gtR: rvi(gt, 'gt'),
  lteR: rvi(lte, 'lte'),
  gteR: rvi(gte, 'gte'),
})
