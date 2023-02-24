import { assert, asyncProperty, check, defaultReportMessage, Parameters } from 'fast-check'
import { writeFile } from 'fs/promises'
import { unlinkIfExists } from '../filesystem'
import { getAssertParametersForReplay, REPLAY_PARAMETERS_PATH } from './replay'
import { Arbitraries } from './types'

export const assertP = async <Ts extends [unknown, ...unknown[]]>(params?: Parameters<Ts>, ...args: [...arbitraries: Arbitraries<Ts>, predicate: (...args: Ts) => Promise<boolean | void>]) => {
  return assert(asyncProperty<Ts>(...args), await getAssertParametersForReplay(params))
}

export const assertPD = async <Ts extends [unknown, ...unknown[]]>(...args: [...arbitraries: Arbitraries<Ts>, predicate: (...args: Ts) => Promise<boolean | void>]) => {
  return assertP({}, ...args)
}

/**
 * IMPORTANT:
 * - Problem: If you're running a test suite that contains multiple tests that use this function, and the first test passes, this function will unlink the REPLAY_PARAMETERS_PATH, and the next test will run normally (instead of being replayed)
 * - Solution: Run only a single test via "-t" flag
 */
export const assertPR = async <Ts extends [unknown, ...unknown[]]>(params?: Parameters<Ts>, ...args: [...arbitraries: Arbitraries<Ts>, predicate: (...args: Ts) => Promise<boolean | void>]) => {
  const details = await check(asyncProperty<Ts>(...args), await getAssertParametersForReplay(params))
  if (details.failed) {
    if (details.counterexample !== null) {
      // TODO: Extract the replayPath for fc.commands from details.counterexample (it is packed into the string...)
      const exports = { assert: { seed: details.seed, path: details.counterexamplePath, endOnFailure: true } }
      const contents = `module.exports = ${JSON.stringify(exports)}`
      await writeFile(REPLAY_PARAMETERS_PATH, contents)
    }
    throw new Error(defaultReportMessage(details))
  } else {
    await unlinkIfExists(REPLAY_PARAMETERS_PATH)
  }
}

export const assertPRD = async <Ts extends [unknown, ...unknown[]]>(...args: [...arbitraries: Arbitraries<Ts>, predicate: (...args: Ts) => Promise<boolean | void>]) => {
  return assertPR({}, ...args)
}
