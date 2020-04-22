import path from 'path'
import { promises as fs } from 'fs'
import { JSDOM } from 'jsdom'
import inlineStylesheets from './processors/inlineStylesheets'
import inlineScripts from './processors/inlineScripts'
import minifyHtml from './minifiers/minifyHtml'
import getContent from './utils/getContent'
import inlineImages from './processors/inlineImages'
import Options from './types/Options'

const defaultOptions: Options = {
  isCLI: false,
  maxInlinableFilesize: 8
}

export default async (entry: string, output: string, options = defaultOptions) => {
  const entryPath = path.resolve(process.cwd(), entry)
  const baseDir = path.dirname(entryPath)

  const { isCLI } = options
  
  const html = await getContent(entryPath)

  /*
    dom serializing is slow - every processor works on the same DOM object
    */
  const dom = new JSDOM(html)

  isCLI && console.log(`Starting processing entry file...`)
  const withInlinedStylesheets = await inlineStylesheets(dom, baseDir, options)
  isCLI && console.log(`CSS inlined and minified!`)
  const withInlinedScripts = await inlineScripts(withInlinedStylesheets, baseDir)
  isCLI && console.log(`JS inlined and minified!`)
  const withInlinedImages = await inlineImages(withInlinedScripts, baseDir, options)
  isCLI && console.log(`Images inlined, SVG minified!`)
  const withMinifiedHtml = await minifyHtml(withInlinedImages.serialize())
  isCLI && console.log(`HTML minified!`)
  
  if(isCLI){
    const outputPath = path.resolve(process.cwd(), output)
    await fs.writeFile(outputPath, withMinifiedHtml)

    console.log(`Done.`)
    console.log(`Output saved at "${outputPath}"`)
  }

  return withMinifiedHtml
}