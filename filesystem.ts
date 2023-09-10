import { OpenMode, PathLike } from 'fs'
import { FileHandle, mkdir, readdir, readFile, stat, unlink } from 'fs/promises'
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

export async function readdirWithoutDotFiles(dir: Dirname) {
  return (await readdir(dir)).filter(name => !name.startsWith('.'))
}

export function getHumanName(filename: string) {
  return basename(filename).split('.')[0]
}

export function getRealName(filename: string) {
  return basename(filename).split('.').slice(0, -1).join('.')
}

export async function pathExists(path: PathLike) {
  return stat(path).then(stat => true).catch(e => {
    if (e.code === 'ENOENT') {
      return false
    } else {
      throw e
    }
  })
}

export async function unlinkIfExists(path: PathLike) {
  if (await pathExists(path)) {
    return unlink(path)
  }
}

export async function mkdirIfNoxExists(folder: string) {
  if (!await pathExists(folder)) {
    await mkdir(folder, { recursive: true })
  }
}
