<h1 align="center">nanocontent</h1>

<div align="center">
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability" />
  </a>
  <a href="https://www.npmjs.com/package/nanocontent">
    <img src="https://img.shields.io/npm/v/nanocontent.svg?style=flat-square" alt="NPM version" />
  </a>
</div>

<br />

**work in progress...**

Introducing flat content state. Read directories of content into an object.

- Store all of your content in a directory
- Each directory is a page
- The content for each page is stored in a text file
- Your file system becomes a router!
- Pairs nicely with [`nanopage`](https://github.com/jondashkyle/nanopage) for traversing object structure

```
npm install nanocontent --save
```

## Usage

Format some plain text files using [smarkt](https://github.com/jondashkyle/smarkt) fields.

```
title: Technopastoral
----
date: January 19, 2038
----
tags:
  - garden
  - engineering
----
text: To deprogram oneself necessitates keeping to very specific schedules, which are what Foucault, once again, described as techniques of the self, echoing Seneca. 
```

Organize them within a directory structure alongside media assets.

```
/content
  /about
    index.txt
  /blog
    /38-01-19-technopastoral
      index.txt
      header.jpg
  index.txt
```

Turn the directory into an object.

```js
var nanocontent = require('nanocontent')
var site = nanocontent.readSiteSync('./content')
```

Each directory becomes a path containing a sub-object of the content in your text file. 

```js
{
  '/': { },
  '/about': { },
  '/blog': { },
  '/blog/30-01-19-technopastoral': { }
  '/blog/30-01-19-technopastoral/header.jpg': { }
}
```

Map over the object keys to add routes to a router, then pass the content object. Huzzah.

## API

#### `.readFile(path, [options])`

#### `.readFiles(files, pathSite, [options])`

#### `.readPage(path, [options])`

#### `.readSite(path, [options])`

#### `.readFileSync(path, [options])`

#### `.readFilesSync(files, pathSite, [options])`

#### `.readPageSync(path, [options])`

#### `.readSiteSync(path, [options])`

## Options

#### `fs`

Provide a custom implementation of `fs`. Ensure the `mkdir` `readdir` `writeFile` and `readFile` methods are available. This is useful for replacing Node’s `fs` with Dat’s API, for instance.

#### `parse`

Substitute `smarkt` with your own parser. Must be able to transform a plain text file into a JSON object.

#### `parent`

Remove part of the `url` for pretty printing. For example, if your content lives in `/content`, but you don’t want to prefix all of your `urls` with `/content`, use `parent` to clean it up. Value can be a string or boolean. If `true`, the `path` of your initial call is used.

## Transform

```
browserify -t nanocontent/transform
```

A browserify transform located at `nanocontent/transform` is included to staticly inline the module output.

## Example

A demo site is included. Open the `nanocontent/example` dir and `npm install`. The example uses [Bankai](https://github.com/choojs/bankai). Run `npm start` to spin up a Bankai server and mess around. Run `bankai build` to build a fully static site.

## Todo

- [ ] Tests
- [ ] Async callback/promise fallback
- [x] Modularize read function for JSON/Smarkt/Custom
