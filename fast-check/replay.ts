import { Parameters } from 'fast-check'
import { CommandsContraints } from 'fast-check/lib/types/check/model/commands/CommandsContraints'
import { existsSync } from 'fs'
import { requireUncached } from '../require'
import { fetchBooleanEnvVar } from '../process'

export const REPLAY_PARAMETERS_PATH = `${process.cwd()}/replay.cjs`

export type AssertReplayParameters = Pick<Parameters, 'seed' | 'path' | 'endOnFailure'>

export type CommandsReplayParameters = Pick<CommandsContraints, 'replayPath'>

export type ReplayParameters = {
  assert: AssertReplayParameters
  commands: CommandsReplayParameters
}

export function getAssertReplayParameters(): AssertReplayParameters {
  return getReplayParameters().assert
}

export function getCommandsReplayParameters(): CommandsReplayParameters {
  return getReplayParameters().commands
}

export function getReplayParameters(): ReplayParameters {
  const shouldReplay = fetchBooleanEnvVar('REPLAY', process.env.REPLAY)
  return shouldReplay ? (existsSync(REPLAY_PARAMETERS_PATH) ? requireUncached(REPLAY_PARAMETERS_PATH) : {}) : {}
}
