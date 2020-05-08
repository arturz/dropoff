<p align="center">
  <img src="https://i.imgur.com/cZ8rSzB.png">
</p>

# $ dropoff

> Packes and losslessly compresses all of scripts, stylesheets and images into one HTML file.

> Useful for landing pages, when load time is especially important.

## Requirements
Scripts, stylesheets and images must have ```inline``` property to be inlined:

```html
<style src="js/main.js" inline />
<link rel="stylesheet" href="css/some-stylesheet.css" inline>
<img src="pizza.png" inline />  
```

All files have to be local resources, maximum file size that can be inlined is 8 KB (it can be changed with --max-size).

```url()``` in stylesheets are automatically inlined, **unless it's a font** property (there are usually many font extensions included for browser compatibility, so inlining all of them is pointless).


## Usage
```sh
npm i -g dropoff
```
and then
```
dropoff index.html dest.html
```
or just
```
npx dropoff index.html dest.html
```

## $ dropoff --help
```sh
Usage:
  $ dropoff <entry> <output>

Description:
  Inlines and minifies JS, CSS and images.

Parameters:
  <entry>                 by default index.html
  <output>                by default dist.html

Options:
  -x, --max-size=<size>   Maximum size in KB of image that can be inlined. By default 8 KB.
```

## API

Just install and import ```dropoff``` module and use it the same way as you would with CLI.

```javascript
import dropoff from 'dropoff'

await dropoff('index.html', 'dest.html', { maxSize: 10 })
```
If you don't want to save .html set the second argument to ```null``` or leave it undefined:
```javascript
const minifiedHtml = await dropoff('index.html', null, { maxSize: 10 })
//or
const minifiedHtml = await dropoff('index.html')
```

TypeScript is supported by default.

## Acknowledgements
- Jason Yu
 for idea of asynchronous [String.prototype.replace](https://dev.to/ycmjason/stringprototypereplace-asynchronously-28k9)
- [node-minify](https://github.com/srod/node-minify) contributors
- [svgo](https://github.com/svg/svgo) team for tool that optimizes SVG
- [esm](https://github.com/standard-things/esm), [jsdom](https://github.com/jsdom/jsdom), [meow](https://github.com/sindresorhus/meow) CLI helper, [mime](https://github.com/broofa/mime), [url-regex](https://github.com/kevva/url-regex)

## License
MIT