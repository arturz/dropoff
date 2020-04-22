"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const dropoff_1 = __importDefault(require("./lib/dropoff"));
const cli = meow_1.default(`
  Usage:
    $ dropoff <entry> <output>

  Description:
    Inlines and minifies JS, CSS and images.

  Parameters:
    <entry>                 by default index.html
    <output>                by default dist.html

  Options:
    -x, --max-size=<size>   Maximum size in KB of image that can be inlined. By default 8 KB.
`);
const [entry = 'index.html', output = 'dist.html'] = cli.input;
const maxSize = parseInt(cli.flags.x) || parseInt(cli.flags.maxSize) || undefined;
console.log(`$ dropoff ${maxSize ? `--max-size=${maxSize}` : ''} "${entry}" "${output}"`);
dropoff_1.default(entry, output, {
    isCLI: true,
    maxInlinableFilesize: (maxSize || 8) * 1024
});
