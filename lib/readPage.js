var assert = require('assert')
var smarkt = require('smarkt')
var xtend = require('xtend')
var path = require('path')

var utilFile = require('../utils/file')
var defaults = require('./defaults')

module.exports = readPage

async function readPage (pathPage, opts) {
  assert.equal(typeof pathPage, 'string', 'arg1: pathPage must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var fs = opts.fs
  var fileIndex = opts.file || defaults.file
  var filetypes = opts.filetypes || defaults.filetypes
  var pathRoot = opts.pathRoot || ''
  var pathUrl = utilFile.formatUrl(pathPage, pathRoot, opts.parent)
  var encoding = opts.encoding || defaults.encoding
  var content = await getContent()
  var childrenInput = await getChildren()
  var children = childrenInput
    .filter(file => utilFile.filterFile(file, fileIndex))
    .reduce(utilFile.sortChildren, { files: [ ], pages: [ ] })
  var files = getFiles(children.files)
  var pages = getPages(children.pages)

  return xtend(content, {
    name: path.basename(pathPage),
    path: pathPage,
    url: pathUrl,
    files: files,
    pages: pages
  })

  async function getFile () {
    try {
      return await fs.readFile(path.join(pathPage, fileIndex), encoding)
    } catch (err) {
      return ''
    }
  }

  async function getChildren () {
    try {
      return await fs.readdir(pathPage)
    } catch (err) {
      return [ ]
    }
  }

  async function getContent () {
    try {
      var content
      content = await fs.readFile(path.join(pathPage, fileIndex), encoding)
      content = smarkt.parse(content)
      return content
    } catch (err) {
      return ''
    }
  }

  function getFiles (files) {
    return files.reduce(function (result, pathFile) {
      var fileParsed = utilFile.getFileMeta({
        pathFile: pathFile,
        pathRoot: pathRoot,
        filetypes: filetypes,
        pathParent: pathPage,
        pathSiteParent: opts.parent
      })

      if (fileParsed.filename) result[fileParsed.filename] = fileParsed
      return result
    }, { })
  }

  function getPages (pages) {
    return pages.reduce(function (result, pathSubpage) {
      var fileParsed = utilFile.getFileMeta({
        pathRoot: pathRoot,
        pathFile: pathSubpage,
        filetypes: filetypes,
        pathParent: pathPage,
        pathSiteParent: opts.parent
      })

      if (fileParsed.name) result[fileParsed.name] = fileParsed
      return result
    }, { })
  }
}
