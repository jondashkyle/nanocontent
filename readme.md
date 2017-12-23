<h1 align="center">hypha</h1>

## features

- Easily transform a directory of files into a site

## conventions

Provided a directory structure you will receive an object of paths.

Each path represents a page, and each page is an object. To give the page content create a file named `index.txt`. The content file contains keys and values (`key: value`) delineated by four dashes (`----`).

## usage

Hypha has three main methods, `file`, `page`, and `site`. All accept two arguments; a `string` representing the path to a file/dir, and an `object` containing [options](#options). The async methods also accept a function as a callback.

```
hypha.readFileSync('./content', { })
```

## Todo

- [ ] Tests
- [ ] Async callback/promise fallback
