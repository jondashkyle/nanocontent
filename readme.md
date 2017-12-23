<h1 align="center">⛺️ hypha</h1>

<div align="center"><b>UNDER CONSTRUCTION</b></div>

<div align="center">Transform a directory of content into JSON</div>

## Usage

Format some plain text files using [smarkt](#hi) fields.

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

Each directory becomes a path containing a sub-object of the content in your text file. Map over the object keys (paths) to add routes to a router and pass the content object. Huzzah.

```
{
  '/': { },
  '/about': { },
  '/blog': { },
  '/blog/30-01-19-technopastoral': { }
}
```

## Todo

- [ ] Tests
- [ ] Async callback/promise fallback
- [ ] Modularize read function for JSON/Smarkt/Custom
