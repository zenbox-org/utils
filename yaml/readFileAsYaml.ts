import { readFileAsString } from '../filesystem'
import { parse } from 'yaml'
import { OpenMode, PathLike } from 'fs'
import { FileHandle } from 'fs/promises'

export async function readFileAsYaml(path: PathLike | FileHandle, options?: { encoding?: null | undefined, flag?: OpenMode | undefined } | null) {
  const string = await readFileAsString(path, options)
  return parse(string)
}
