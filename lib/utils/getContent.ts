import path from 'path'
import { promises as fs } from 'fs'

export default async (filePath: string) => {
  if(!path.isAbsolute(filePath))
    throw `getContent(filePath): filePath must be absolute!`

  return await fs.readFile(filePath, 'utf8')
}