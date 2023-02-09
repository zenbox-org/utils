import { Arithmetic } from '../arithmetic'

export const isDescending = <N>({ gt }: Arithmetic<N>) => (nums: N[]) => !nums.find((n, i) => nums[i] && gt(nums[i], n))

export const isAscending = <N>({ lt }: Arithmetic<N>) => (nums: N[]) => !nums.find((n, i) => nums[i] && lt(nums[i], n))
