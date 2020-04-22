const minify = require('@node-minify/core')
const compressor = require('@node-minify/uglify-es')

export default async (content: string) => 
  await minify({ compressor, content })