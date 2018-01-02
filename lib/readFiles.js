var assert = require('assert')

var defaults = require('./defaults')
var readFile = require('./readFile')

module.exports = readFiles

async function readFiles (files, pathSite, opts) {
  assert.equal(typeof files, 'object', 'arg1: files must be type object')
  assert.equal(typeof opts, 'object', 'arg2: opts must be type object')
  assert.equal(typeof opts.fs, 'object', 'arg2: opts.fs must be type object')

  var output = { }

  // read the index
  if (files.indexOf(pathSite) < 0) {
    files.push(pathSite)
  }

  await Promise.all(files.map(read))
  return output

  async function read (pathFile) {
    var content = await readFile(pathFile, opts)
    if (content && !content.name.match(defaults.ignore)) {
      output[content.url] = content
    }
    return content
  }
}
