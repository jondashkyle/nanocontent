var assert = require('assert')
var slash = require('slash')
var xtend = require('xtend')
var path = require('path')

var utilContent = require('../utils/content')
var utilFile = require('../utils/file')
var defaults = require('./defaults')

module.exports = readPageSync

function readPageSync (pathPage, opts) {
  assert.equal(typeof pathPage, 'string', 'arg1: pathPage must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var fs = opts.fs
  var fileIndex = opts.file || defaults.file
  var filetypes = opts.filetypes || defaults.filetypes
  var pathRoot = opts.pathRoot || ''
  var pathUrl = utilFile.formatUrl(pathPage, pathRoot, opts.parent)
  var encoding = opts.encoding || defaults.encoding
  var content = getContent()
  var children = getChildren()
    .filter(file => utilFile.filterFile(file, fileIndex))
    .reduce(utilFile.sortChildren, { files: [ ], pages: [ ] })
  var files = getFiles(children.files)
  var pages = getPages(children.pages)

  return xtend(content, {
    name: path.basename(pathPage),
    url:  pathUrl,
    files: files,
    pages: pages
  })

  function getFile () {
    try {
      return fs.readFileSync(path.join(pathPage, fileIndex), encoding)
    } catch (err) {
      return ''
    }
  }

  function getChildren () {
    try {
      return fs.readdirSync(pathPage)
    } catch (err) {
      return [ ]
    }
  }

  function getContent () {
    try {
      var content
      content = fs.readFileSync(path.join(pathPage, fileIndex), encoding)
      if (opts.localizePaths) content = utilContent.localizePaths(content, pathUrl)
      content = utilContent.decode(content)
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
        pathSiteParent: opts.parent,
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
