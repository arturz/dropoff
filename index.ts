import dropoff from './lib/dropoff'

export default (entry: string = 'index.html', output: string = 'dest.html', { maxSize } = { maxSize: 8 }) =>
  dropoff(entry, output, {
    maxInlinableFilesize: maxSize * 1024,
    isCLI: false
  })