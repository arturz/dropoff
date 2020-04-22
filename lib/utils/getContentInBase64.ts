import path from 'path'
import { promises as fs } from 'fs'
import mime from 'mime'

export default async (filePath: string) => {
  if(!path.isAbsolute(filePath))
    throw `getContent(filePath): filePath must be absolute!`

  const mimeType = mime.getType(filePath)
  const data = await fs.readFile(filePath, 'base64')
  return `data:${mimeType};base64,${data}`
}