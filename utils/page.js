var assert = require('assert')
var path = require('path')

module.exports = {
  isPage: isPage
}

function isPage (pathPage) {
  assert.equal(typeof pathPage, 'string', 'arg1 pathPage must be type string')
  return path.extname(pathPage) === ''
}
