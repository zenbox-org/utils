import { OpenMode, PathLike } from 'fs'
import { FileHandle, mkdir, readdir, readFile, stat } from 'fs/promises'
import { basename } from 'path'

export type Filename = PathLike

export type Dirname = PathLike

export async function readFileAsString(path: PathLike | FileHandle, options?: { encoding?: null | undefined, flag?: OpenMode | undefined } | null): Promise<string> {
  const buffer = await readFile(path, options)
  return buffer.toString()
}

/**
 * NOTE: Does not filter out the directories
 */
export async function readFilesAsString(dir: Dirname) {
  const filenames = await readdir(dir)
  return Promise.all(filenames.map(file => readFileAsString(`${dir}/${file}`)))
}

export function getHumanName(filename: string) {
  return basename(filename).split('.')[0]
}

export function getRealName(filename: string) {
  return basename(filename).split('.').slice(0, -1).join('.')
}

export async function fileExists(path: PathLike) {
  return stat(path).then(stat => true).catch(e => false)
}

export async function mkdirIfNoxExists(folder: string) {
  if (!await fileExists(folder)) {
    await mkdir(folder, { recursive: true })
  }
}
