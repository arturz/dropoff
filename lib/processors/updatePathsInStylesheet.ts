import path from 'path'
import isUrl from '../utils/isUrl'
import getSize from '../utils/getSize'
import asyncStringReplace from '../utils/asyncStringReplace'
import getContentInBase64 from '../utils/getContentInBase64'
import withoutIEfix from '../utils/withoutIEfix'
import Options from '../types/Options'
import getMinifiedSvgInBase64 from '../utils/getMinifiedSvgInBase64'
import getContent from '../utils/getContent'

//do not match properties starting with src: and urls ending with format
//[ \t]* -> one or many spaces
const URL_PATTERN = /(?<!src:[ \t]*)(url\(\s*['"]?)([^"')]+)(["']?\s*\))(?! format)/g

export default async (stylesheet: string, stylesheetDir: string, htmlDir: string, { maxInlinableFilesize }: Options) =>
  await asyncStringReplace(stylesheet, URL_PATTERN, async (matched: string, before: string, url: string, after: string) => {
    if(isUrl(url))
      return matched

    url = withoutIEfix(url)
    
    const absoluteUrl = path.isAbsolute(url)
      ? url
      : path.resolve(stylesheetDir, url)

    if(await getSize(absoluteUrl) > maxInlinableFilesize){
      /*
        /
          index.html
          /styles/
            style.css:
              div { background: url(../images/...); }

        makes to

        /
          index.html:
            <style>
            div { background: url(./images/...); }
            </style>
      */
      const updatedRelativePath = path.relative(htmlDir, absoluteUrl)
      return `${before}${updatedRelativePath}${after}`
    }

    if(path.extname(absoluteUrl) === '.svg')
      return `${before}${await getMinifiedSvgInBase64(await getContent(absoluteUrl))}${after}`
    
    return `${before}${await getContentInBase64(absoluteUrl)}${after}`
  })