import { Arithmetic } from '../arithmetic'

export const getDeltas = <N>({ sub, zero }: Arithmetic<N>) => (nums: N[]) => nums.map((n, i) => sub(n, nums[i - 1] || zero)).slice(1)
