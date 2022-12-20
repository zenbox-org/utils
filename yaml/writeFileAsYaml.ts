import { stringify } from 'yaml'
import { BaseEncodingOptions, Mode, OpenMode, PathLike } from 'fs'
import { FileHandle, writeFile } from 'fs/promises'

export async function writeFileAsYaml(path: PathLike | FileHandle, obj: unknown, options?: BaseEncodingOptions & { mode?: Mode | undefined, flag?: OpenMode | undefined } | BufferEncoding | null) {
  const string = stringify(obj)
  return writeFile(path, string, options)
}
