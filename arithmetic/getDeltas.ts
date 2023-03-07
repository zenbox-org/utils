import { BasicArithmetic } from '../arithmetic'

export const getDeltas = <N>({ sub, zero }: BasicArithmetic<N>) => (nums: N[]) => nums.map((n, i) => sub(n, nums[i - 1] || zero)).slice(1)
