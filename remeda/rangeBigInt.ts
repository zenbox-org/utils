/**
 * Can't reuse range() from 'remeda' because converting bigint to a number loses precision
 */
export const rangeBigInt = (start: bigint, end: bigint) => {
  const result = []
  for (let i = start; i < end; i++) result.push(i)
  return result
}
