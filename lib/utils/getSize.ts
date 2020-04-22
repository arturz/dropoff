import path from 'path'
import { promises as fs } from 'fs'

export default async (filePath: string) => {
  if(!path.isAbsolute(filePath))
    throw `getSize(filePath): filePath must be absolute!`

  return (await fs.stat(filePath)).size
}