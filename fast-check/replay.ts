import { Parameters } from 'fast-check'
import { CommandsContraints } from 'fast-check/lib/types/check/model/commands/CommandsContraints'
import { existsSync } from 'fs'
import { requireUncached } from '../require'
import { fetchBooleanEnvVar, getBooleanEnvVar } from '../process'

export const REPLAY_PARAMETERS_PATH = `${process.cwd()}/replay.cjs`

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

const defaultAssertParameters: Pick<Parameters, 'verbose'> = {
  verbose: getBooleanEnvVar('FAST_CHECK_VERBOSE', process.env.FAST_CHECK_VERBOSE, true),
}

export function getAssertParametersForReplay<T>(overrides: Parameters<T> = defaultAssertParameters): Parameters<T> {
  return { ...getReplayParameters().assert, ...overrides }
}

export function getCommandsConstraintsForReplay(overrides: CommandsContraints = {}): CommandsContraints {
  return { ...getReplayParameters().commands, ...overrides }
}

/**
 * IMPORTANT:
 * fast-check may run your code multiple times to find the minimal counterexample (this process is called "shrinking").
 * to avoid log pollution, you need to use the replay parameters that fast-check outputs after finding the minimal counterexample, which must include `endOnFailure: true` (for example: `{ seed: 459726200, path: "0:0:0:0:0:0", endOnFailure: true }`)
 */
export function getReplayParameters(): ReplayParameters {
  const shouldReplay = fetchBooleanEnvVar('REPLAY', process.env.REPLAY)
  if (shouldReplay) {
    if (existsSync(REPLAY_PARAMETERS_PATH)) {
      const parameters = requireUncached(REPLAY_PARAMETERS_PATH)
      return { ...emptyReplayParameters, ...parameters }
    }
  }
  return emptyReplayParameters
}
