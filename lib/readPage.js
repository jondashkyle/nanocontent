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
  var pathRoot = opts.pathRoot || ''
  var pathUrl = utilFile.formatUrl(pathPage, pathRoot, opts.parent)
  var encoding = opts.encoding || defaults.encoding
  var content = await getContent()

  return xtend(content, {
    name: path.basename(pathPage),
    path: utilFile.formatUrl(pathPage, pathRoot),
    url: pathUrl
  })

  async function getContent () {
    try {
      var content = await fs.readFile(slash(path.join(pathPage, fileIndex)), encoding)
      return parse(content)
    } catch (err) {
      return ''
    }
  }
}
