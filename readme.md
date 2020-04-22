<p align="center">
  <img src="https://i.imgur.com/cZ8rSzB.png">
</p>

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

## Options
```sh
$ dropoff --help

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