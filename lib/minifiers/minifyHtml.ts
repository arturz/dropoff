const minify = require('@node-minify/core')
const compressor = require('@node-minify/html-minifier')

export default async (content: string) => 
  await minify({ compressor, content })