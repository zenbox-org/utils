import { OpenMode, PathLike } from 'fs'
import fs, { FileHandle, mkdir, readFile } from 'fs/promises'
import { basename } from 'path'

export type Path = string

export async function readFileAsString(path: PathLike | FileHandle, options?: { encoding?: null | undefined, flag?: OpenMode | undefined } | null): Promise<string> {
  const buffer = await readFile(path, options)
  return buffer.toString()
}

export function getHumanName(filename: string) {
  return basename(filename).split('.')[0]
}

export async function fileExists(path: PathLike) {
  return fs.stat(path).then(stat => true).catch(e => false)
}

export async function mkdirIfNoxExists(folder: string) {
  if (!await fileExists(folder)) {
    await mkdir(folder, { recursive: true })
  }
}

export type Filename = PathLike

export type Dirname = PathLike

export function getFiles(dir: Dirname) {
  return fs.readdirSync(dir).map((file) => fs.readFileSync(`${dir}/${file}`))
}

export function realname(filename: string) {
  return path.basename(filename).split('.').slice(0, -1).join('.')
}
