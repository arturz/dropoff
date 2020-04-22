import minifySvg from '../minifiers/minifySvg'

export default async (content: string) => {
  const minifiedSvg = await minifySvg(content)
  const buff = Buffer.from(minifiedSvg)
  return `data:image/svg+xml;base64,${buff.toString('base64')}`
}