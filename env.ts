import { DotenvParseOutput, parse } from 'dotenv'
import { PathLike } from 'fs'
import { readFile } from 'fs/promises'
import * as process from 'process'
import { merge } from 'remeda'
import ProcessEnv = NodeJS.ProcessEnv

export type Env = Record<string, string | undefined> & ProcessEnv

/**
 * NOTE: This function modifies process.env
 */
export async function updateProcessEnv(dir: string = process.cwd()): Promise<void> {
  const config = await getEnvConfig(dir)
  Object.assign(process.env, config)
}

export async function getEnv(dir: string = process.cwd()): Promise<Env> {
  const config = await getEnvConfig(dir)
  return merge(config, process.env)
}

export async function getEnvConfig(dir: string) {
  const configs = await Promise.all([
    getEnvFromFileMaybe(`${dir}/.env`),
    getEnvFromFileMaybe(`${dir}/.env.development`),
    getEnvFromFileMaybe(`${dir}/.env.local`),
  ])
  return configs.reduce((fullConfig, partialConfig) => merge(fullConfig, partialConfig), {})
}

export async function getEnvFromFileMaybe(filename: PathLike): Promise<DotenvParseOutput> {
  return readFile(filename).then(parse).catch((e) => {
    if (e.code === 'ENOENT') {
      return {}
    } else {
      throw e
    }
  })
}
