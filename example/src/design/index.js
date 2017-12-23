var gr8 = require('gr8')

var utils = [ ]

var colors = {
  white: '#fff',
  black: '#000'
}

utils.push({
  prop: 'font-family',
  join: '-',
  vals: {
    sans: '-apple-system, BlinkMacSystemFont, sans-serif'
  }
})

utils.push({
  prop: { bgc: 'background-color' },
  join: '-',
  vals: colors
})

utils.push({
  prop: { fc: 'color' },
  join: '-',
  vals: colors
})

var gr8css = gr8({
  utils: utils
})

module.exports = gr8css
