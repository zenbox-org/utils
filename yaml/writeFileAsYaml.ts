import { EncodingOption, Mode, OpenMode, PathLike } from 'fs'
import { FileHandle, writeFile } from 'fs/promises'
import { stringify } from 'yaml'

export async function writeFileAsYaml(path: PathLike | FileHandle, obj: unknown, options?: EncodingOption & { mode?: Mode | undefined, flag?: OpenMode | undefined } | BufferEncoding | null) {
  const string = stringify(obj)
  return writeFile(path, string, options)
}
