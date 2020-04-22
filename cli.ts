import meow from 'meow'
import dropoff from './lib/dropoff'

const cli = meow(`
  Usage:
    $ dropoff <entry> <output>

  Description:
    Inlines and minifies JS, CSS and images.

  Parameters:
    <entry>                 by default index.html
    <output>                by default dist.html

  Options:
    -x, --max-size=<size>   Maximum size in KB of image that can be inlined. By default 8 KB.
`)

const [entry = 'index.html', output = 'dist.html'] = cli.input
const maxSize = parseInt(cli.flags.x as string) || parseInt(cli.flags.maxSize as string) || undefined

console.log(`$ dropoff ${maxSize ? `--max-size=${maxSize}` : ''} "${entry}" "${output}"`)
dropoff(entry, output, { 
  isCLI: true,
  maxInlinableFilesize: (maxSize || 8) * 1024
})