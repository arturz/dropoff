import path from 'path'
import { JSDOM } from 'jsdom'
import getContent from '../utils/getContent'
import minifyCss from '../minifiers/minifyCss'
import updatePathsInStylesheet from './updatePathsInStylesheet'
import withoutIEfix from '../utils/withoutIEfix'
import Options from '../types/Options'

export default async (dom: JSDOM, baseDir: string, options: Options) => {
  const { window: { document } } = dom

  const stylesheets = document.querySelectorAll('link[rel="stylesheet"][href][inline]')
  for(const stylesheet of stylesheets){
    const href = withoutIEfix(stylesheet.getAttribute('href') as string)
    const filePath = path.isAbsolute(href)
      ? href
      : path.resolve(baseDir, href)

    const content = await minifyCss(await getContent(filePath))

    //Makes paths in url() relative to HTML and inlines url() if it is possible
    const contentWithUpdatedPaths = await updatePathsInStylesheet(content, path.dirname(filePath), baseDir, options)

    const styleElement = document.createElement('style')
    styleElement.appendChild(document.createTextNode(contentWithUpdatedPaths))
    document.head.appendChild(styleElement)

    stylesheet.remove()
  }

  return dom
}