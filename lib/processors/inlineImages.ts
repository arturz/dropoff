import path from 'path'
import { JSDOM } from 'jsdom'
import withoutIEfix from '../utils/withoutIEfix'
import getContentInBase64 from '../utils/getContentInBase64'
import getSize from '../utils/getSize'
import Options from '../types/Options'
import getContent from '../utils/getContent'
import getMinifiedSvgInBase64 from '../utils/getMinifiedSvgInBase64'
import isUrl from '../utils/isUrl'

export default async (dom: JSDOM, baseDir: string, { maxInlinableFilesize }: Options) => {
  const { window: { document } } = dom

  const images = document.querySelectorAll('img[src][inline]')
  for(const img of images){
    const src = withoutIEfix(img.getAttribute('src') as string)
    if(isUrl(src))
      continue

    const filePath = path.isAbsolute(src)
      ? src
      : path.resolve(baseDir, src)

    //don't inline files bigger than maxInlinableFilesize
    if(await getSize(filePath) > maxInlinableFilesize)
      continue

    if(path.extname(filePath) === '.svg')
      img.setAttribute('src', await getMinifiedSvgInBase64(await getContent(filePath)))
    else
      img.setAttribute('src', await getContentInBase64(filePath))
    
    img.removeAttribute('inline')
  }

  return dom
}