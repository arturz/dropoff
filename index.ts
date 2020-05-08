import dropoff from './lib/dropoff'

interface Config {
  maxSize?: number
}

export default (entry: string, output?: string, { maxSize = 8 }: Config = {}) =>
  dropoff(entry, output ?? '', {
    maxInlinableFilesize: maxSize * 1024,
    isCLI: false
  })