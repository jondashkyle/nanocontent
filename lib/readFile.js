var promisify = require('promisify-node')
var assert = require('assert')
var smarkt = require('smarkt')
var xtend = require('xtend')
var path = require('path')

var utilFile = require('../utils/file')
var utilPage = require('../utils/page')
var readPage = require('./readPage')
var defaults = require('./defaults')

module.exports = readFile

async function readFile (pathFile, opts) {
  assert.equal(typeof pathFile, 'string', 'arg1: pathFile must be type string')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  // pages
  if (utilPage.isPage(pathFile)) return readPage(pathFile, opts)

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
    pathSource: opts.source,
    pathSiteParent: opts.parent
  })

  // skip text files
  if (fileExtname === fileParsed.extension) return false

  try {
    var pathMeta = pathFile + fileExtname
    var text = isAsync(fs.readFile)
      ? await fs.readFile(pathMeta, encoding)
      : await promisify(fs.readFile)(pathMeta, encoding)
    return xtend(parse(text), fileParsed)
  } catch (err) {
    // console.log(fileParsed.filename, err.message)
    if (fileParsed.filename) return Promise.resolve(fileParsed)
    else return Promise.resolve(false)
  }
}

function isAsync (fn) {
  return fn.constructor.name === 'AsyncFunction'
}
