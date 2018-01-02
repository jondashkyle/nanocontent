<h1 align="center">⛺️ hypha</h1>

<div align="center"><b>UNDER CONSTRUCTION</b></div>

<div align="center">Transform folders and files into JSON</div>

## In a nutshell

- Store all of your content in a directory
- Each page is a sub-directory, and so on
- The content for each page is stored in a text file
- Use the path to each page as a URL in a router

uhhh yeah need to communicate this clearly.

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
var hypha = require('hypha')
var site = hypha.readSiteSync('./content')
```

Each directory becomes a path containing a sub-object of the content in your text file. 

```
{
  '/': { },
  '/about': { },
  '/blog': { },
  '/blog/30-01-19-technopastoral': { }
}
```

Map over the object keys to add routes to a router, then pass the content object. Huzzah.

## API

#### `.readSiteSync(path, [options])`

#### `.readeSite(path, [options || callback], [callback])`

## Options

#### `fs`

Provide a custom implementation of `fs`. Ensure the `mkdir` `readdir` `writeFile` and `readFile` methods are available. This is useful for replacing Node’s `fs` with Dat’s API, for instance.

#### `parse`

Substitute `smarkt` with your own parser. Must be able to transform a plain text file into a JSON object.

## Transform

```
browserify -t hypha/transform
```

A browserify transform located at `hypha/transform` is included to staticly inline the module output.

## Example

A demo site is included. Open the `hypha/example` dir and `npm install`. The example uses [Bankai](https://github.com/choojs/bankai). Run `npm start` to spin up a Bankai server and mess around. Run `bankai build` to build a fully static site.

## Todo

- [ ] Tests
- [ ] Async callback/promise fallback
- [x] Modularize read function for JSON/Smarkt/Custom
