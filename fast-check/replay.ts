import { Parameters } from 'fast-check'
import { CommandsContraints } from 'fast-check/lib/types/check/model/commands/CommandsContraints'
import { pathExists } from '../filesystem'
import { fetchBooleanEnvVar, getBooleanEnvVar, getIntegerEnvVar } from '../process'

export const REPLAY_PARAMETERS_PATH = `${process.cwd()}/replay.cjs`

export interface ParametersWithReplay<T = void> extends Parameters<T> {
  replayParametersPath: string
}

export type AssertReplayParameters = Pick<Parameters, 'seed' | 'path' | 'endOnFailure'>

export type CommandsReplayParameters = Pick<CommandsContraints, 'replayPath'>

export type ReplayParameters = {
  assert: AssertReplayParameters
  commands: CommandsReplayParameters
}

const emptyReplayParameters: ReplayParameters = {
  assert: {},
  commands: {},
}

const defaultAssertParameters = {
  verbose: getBooleanEnvVar('FAST_CHECK_VERBOSE', process.env.FAST_CHECK_VERBOSE, true),
  numRuns: getIntegerEnvVar('FAST_CHECK_NUM_RUNS', process.env.FAST_CHECK_NUM_RUNS, 500),
}

export async function getAssertParametersForReplay<T>(overrides: Parameters<T> = defaultAssertParameters): Promise<Parameters<T>> {
  const replay = await getReplayParameters()
  return { ...replay.assert, ...overrides }
}

export async function getCommandsConstraintsForReplay(overrides: CommandsContraints = {}): Promise<CommandsContraints> {
  const replay = await getReplayParameters()
  return { ...replay.commands, ...overrides }
}

/**
 * IMPORTANT:
 * fast-check may run your code multiple times to find the minimal counterexample (this process is called "shrinking").
 * to avoid log pollution, you need to use the replay parameters that fast-check outputs after finding the minimal counterexample, which must include `endOnFailure: true` (for example: `{ seed: 459726200, path: "0:0:0:0:0:0", endOnFailure: true }`)
 */
export async function getReplayParameters(): Promise<ReplayParameters> {
  const shouldReplay = fetchBooleanEnvVar('REPLAY', process.env.REPLAY)
  if (shouldReplay) {
    if (await pathExists(REPLAY_PARAMETERS_PATH)) {
      const parameters = await import(REPLAY_PARAMETERS_PATH)
      return { ...emptyReplayParameters, ...parameters.default }
    }
  }
  return emptyReplayParameters
}

// export const assertR = async <Ts>(property: IAsyncProperty<Ts>, params?: Parameters<Ts>) => {
//   return assert(property, await getAssertParametersForReplay(params))
// }

// export function assertR<Ts>(property: IRawProperty<Ts>, params?: Parameters<Ts>): Promise<void> | void {
//
// }
