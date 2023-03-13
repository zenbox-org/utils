import { Bounds } from './index'

export const inside = <N>(bounds: Bounds<N>) => (value: N) => {
  return value >= bounds.min && value <= bounds.max
}
