const minify = require('@node-minify/core')
const compressor = require('@node-minify/clean-css')

export default async (content: string) => 
  await minify({ compressor, content })