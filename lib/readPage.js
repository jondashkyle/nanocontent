var slash = require('normalize-path')
var assert = require('assert')
var smarkt = require('smarkt')
var xtend = require('xtend')
var path = require('path')
var pify = require('pify')

var utilFile = require('../utils/file')
var defaults = require('./defaults')

module.exports = readPage

async function readPage (pathPage, opts) {
  assert.equal(typeof pathPage, 'string', 'arg1: pathPage must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var fs = opts.fs.url ? opts.fs : pify(opts.fs) // web api or node
  var parse = typeof opts.parse === 'function' ? opts.parse : smarkt.parse
  var fileIndex = opts.file || defaults.file
  var fileExtname = path.extname(fileIndex)
  var filetypes = opts.filetypes || defaults.filetypes
  var pathRoot = opts.pathRoot || ''
  var pathUrl = utilFile.formatUrl(pathPage, pathRoot, opts.parent)
  var encoding = opts.encoding || defaults.encoding
  var content = await getContent()
  var childrenInput = await getChildren()
  var children = childrenInput
    .filter(file => utilFile.filterFile(file, fileIndex))
    .reduce(utilFile.sortChildren, { files: [], pages: [] })
  var files = await getFiles(children.files)
  var pages = getPages(children.pages)

  return xtend(content, {
    name: path.basename(pathPage),
    path: utilFile.formatUrl(pathPage, pathRoot),
    url: pathUrl,
    files: files,
    pages: pages
  })

  async function getChildren () {
    try {
      return await fs.readdir(pathPage)
    } catch (err) {
      return []
    }
  }

  async function getContent () {
    try {
      var content
      content = await fs.readFile(slash(path.join(pathPage, fileIndex)), encoding)
      content = parse(content)
      return content
    } catch (err) {
      return ''
    }
  }

  async function getFiles (files) {
    var result = { }
    await Promise.all(files.map(read))
    return result

    async function read (pathFile) {
      var fileParsed = utilFile.getFileMeta({
        pathFile: pathFile,
        pathRoot: pathRoot,
        filetypes: filetypes,
        pathParent: pathPage,
        pathSource: opts.source,
        pathSiteParent: opts.parent
      })

      try {
        var fileMeta = pathFile + fileExtname
        var pathMeta = path.join(pathPage, fileMeta)
        var text = await fs.readFile(pathMeta, encoding)
        // set
        result[fileParsed.filename] = xtend(parse(text), fileParsed)
        files.splice(files.indexOf(fileMeta), 1)
        // cleanup
        delete result[fileMeta]
        return text
      } catch (err) {
        if (fileParsed.filename) {
          result[fileParsed.filename] = fileParsed
        }
        return Promise.resolve()
      }
    }
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
    }, {})
  }
}
