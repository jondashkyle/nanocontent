var locksley = require('locksley')
var css = require('sheetify')
var xtend = require('xtend')
var choo = require('choo')

// site setup
var site = locksley.readSiteSync('./content', {
  parent: '/content'
})

var views = require('./src/views')
var app = choo()

css('./src/design/index.js')
app.use(require('./src/stores/content')(site))

// routes
app.route('*', require('./src/views/notfound'))

// export and mount
if (module.parent) module.exports = app
else app.mount('body')

// create state & routes
function content (state, emitter) {
  state.content = { }
  site.forEach(function (page) {
    // set view or fallback
    var pageUrl = page.url
    var view = views[page.view] || views.main 

    // extend state & create route
    state.content[pageUrl] = page
    app.route(pageUrl, function (state, emit) {
      return view(xtend(state, { page: page }) , emit)
    })
  })
}