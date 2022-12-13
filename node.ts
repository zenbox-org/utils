import { basename } from 'path'
import { fileURLToPath, URL } from 'url'

export const get__filename = fileURLToPath

export const get__basename = (url: string | URL) => basename(fileURLToPath(url))

export const get__dirname = (url: string | URL) => fileURLToPath(new URL('.', url))
