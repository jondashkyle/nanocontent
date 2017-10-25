var objectKeys = require('object-keys')
var assert = require('assert')
var yaml = require('js-yaml')
var xtend = require('xtend')

module.exports = {
  keysToLowerCase: keysToLowerCase,
  encode: encode,
  decode: decode
}

function decode (str) {
  assert.equal(typeof str, 'string', 'enoki: arg1 str must be type string')

  return str
    .split('\n----')
    .filter(str => str)
    .reduce(function (result, field) {
      var data = field
        .replace(/^\s+|\s+$/g, '')
        .split(/:([^]+)/)
        .filter(str => str.trim() !== '')

      if (data.length >= 2) {
        if (data[1].trim().charAt(0) !== '-') {
          result[data[0].toLowerCase()] = setBool(data[1].trim())
        } else {
          result = xtend(result, keysToLowerCase(yaml.safeLoad(field)))
        }
      }

      return result
    }, { })
}

function encode (obj) {
  return objectKeys(obj)
    .reduce(function (result, key) {
      var value = obj[key]
      if (typeof value === 'object') {
        result.push(yaml.safeDump({ [key]: value }))
      } else {
        result.push(key + ': ' + value)
      }

      return result
    }, [ ])
    .join('\n\n----\n\n')
}

function keysToLowerCase(obj) {
  if (
    !typeof(obj) === 'object' ||
    typeof(obj) === 'string' ||
    typeof(obj) === 'number' ||
    typeof(obj) === 'boolean'
  ) {
    return obj
  }

  var keys = Object.keys(obj)
  var n = keys.length
  var lowKey

  while (n--) {
    var key = keys[n];
    if (key === (lowKey = key.toLowerCase())) continue
    obj[lowKey] = keysToLowerCase(obj[key])
    delete obj[key]
  }

  return (obj)
}

function setBool (str) {
  if (str === 'true') return true
  if (str === 'false') return false
  return str
}
