import { parse } from 'dotenv'
import { PathLike } from 'fs'
import { readFile } from 'fs/promises'
import { merge } from 'remeda'
import ProcessEnv = NodeJS.ProcessEnv

export type Env = Record<string, string | undefined> & ProcessEnv

/**
 * NOTE: This function updates process.env
 */
export async function loadEnv(): Promise<Env> {
  const cwd = process.cwd()
  const configs = await Promise.all([
    getEnvFromFileMaybe(`${cwd}/.env`),
    getEnvFromFileMaybe(`${cwd}/.env.development`),
    getEnvFromFileMaybe(`${cwd}/.env.local`),
  ])
  return configs.reduce<ProcessEnv>(function (fullConfig, partialConfig) {
    return merge(fullConfig, partialConfig)
  }, process.env)
}

export async function getEnvFromFileMaybe(filename: PathLike) {
  return readFile(filename).then(parse).catch((e) => {
    if (e.code === 'ENOENT') {
      return {}
    } else {
      throw e
    }
  })
}
