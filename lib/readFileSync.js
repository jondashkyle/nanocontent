var assert = require('assert')
var smarkt = require('smarkt')
var xtend = require('xtend')
var path = require('path')

var readPageSync = require('./readPageSync')
var utilFile = require('../utils/file')
var utilPage = require('../utils/page')
var defaults = require('./defaults')

module.exports = readFileSync

function readFileSync (pathFile, opts) {
  assert.equal(typeof pathFile, 'string', 'arg1: pathFile must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  // page
  if (utilPage.isPage(pathFile)) return readPageSync(pathFile, opts)

  var fs = opts.fs
  var parse = typeof opts.parse === 'function' ? opts.parse : smarkt.parse
  var fileIndex = opts.file || defaults.file
  var fileExtname = path.extname(fileIndex).toLowerCase()
  var filetypes = opts.filetypes || defaults.filetypes
  var pathRoot = opts.pathRoot || ''
  var encoding = opts.encoding || defaults.encoding
  var fileParsed = utilFile.getFileMeta({
    pathFile: pathFile,
    pathRoot: pathRoot,
    filetypes: filetypes,
    pathSiteParent: opts.parent
  })

  // skip text files
  if (fileExtname === fileParsed.extension) return false

  try {
    var pathMeta = pathFile + fileExtname
    var text = fs.readFileSync(pathMeta, encoding)
    return xtend(parse(text), fileParsed)
  } catch (err) {
    if (fileParsed.filename) return fileParsed
    else return false
  }
}
