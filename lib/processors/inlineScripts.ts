import path from 'path'
import { JSDOM } from 'jsdom'
import getContent from '../utils/getContent'
import minifyJs from '../minifiers/minifyJs'
import withoutIEfix from '../utils/withoutIEfix'

export default async (dom: JSDOM, baseDir: string) => {
  const { window: { document } } = dom

  const scripts = document.querySelectorAll('script[src][inline]')
  for(const script of scripts){
    const src = withoutIEfix(script.getAttribute('src') as string)
    const filePath = path.isAbsolute(src)
      ? src
      : path.resolve(baseDir, src)

    const content = await getContent(filePath)

    const newScript = document.createElement('script')
    newScript.appendChild(document.createTextNode(await minifyJs(content)))
    document.head.appendChild(newScript)
  
    script.remove()
  }

  return dom
}