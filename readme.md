<h1 align="center">enoki</h1>

## features

- Easily transform a directory of files into a site

## conventions

Provided a directory structure you will receive an object of paths.

<table>
<tr>
<td>input</td>
<td>output</td>
</tr>
<tr valign="top">
<td>
<pre>- content
  - about
  - projects
    - project-one
    - project-two</pre>
</td>
<td>
<pre lang="nemerle">{
  '/': { },
  '/about': { },
  '/projects': { },
  '/projects/project-one': { },
  '/projects/project-two': { }
}</pre>
</td>
</tr>
</table>

Each path represents a page, and each page is an object. To give the page content create a file named `index.txt`. The content file contains keys and values (`key: value`) delineated by four dashes (`----`).

<table>
<tr>
<td>input</td>
<td>output</td>
</tr>
<tr valign="top">
<td>
<pre>title: Page Title
----
text: Hey there!
----
tags:
  - one
  - two</pre>
</td>
<td>
<pre lang="nemerle">{
  title: 'Page title',
  text: 'Hey there!',
  tags: ['one', 'two'],
  files: { },
  pages: { }
}</pre>
</td>
</tr>
</table>

## usage

Enoki has three main methods, `file`, `page`, and `site`. All accept two arguments; a `string` representing the path to a file/dir, and an `object` containing [options](#options). The async methods also accept a function as a callback.

```
enoki.readFileSync('./content', { })
```

### `.readFileSync`

### `.readPageSync`


### `.readSiteSync`

### `.read[method]`

Each method is also able to be called asynchronously.

```
enoki.readFile('./site', { }, callback)
enoki.readPage('./site', { }, callback)
enoki.readSite('./site', { }, callback)
```

The callback function passes a single argument containing an object. When using `file` or `page` this is an object, and for `site` this is an array.

```
function callback (data) {
  console.log(data)
}
```

## transform

You can use Enoki with Browserify by using the transform.

```
browserify index.js -t enoki/transform
```

This only works with the synchronous methods.

```
var enoki = require('enoki')
var site = enoki.readSiteSync('./content')
```

## options

Each method accepts an `object` containing options as it’s second argument.

### `.fs` object

Pass a custom filesystem to be used to read directories and files. Required methods are `fs.readdir`, `fs.writedir`, `fs.readFile` and `fs.writeFile`. If using synchronous methods please provide the appropriate `Sync` methods. Fallback to Node’s `fs` module if undefined.

### `.pathRoot` string
