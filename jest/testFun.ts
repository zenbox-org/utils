/* eslint-disable @typescript-eslint/ban-types */
import { test } from '@jest/globals'
import { Circus } from '@jest/types'

export const testFun = (func: Circus.TestFn) => test(func.name, func)

testFun.skip = (func: Circus.TestFn) => test.skip(func.name, func)
