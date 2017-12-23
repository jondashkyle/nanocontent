var objectKeys = require('object-keys')
var xtend = require('xtend')
var views = require('../views')

module.exports = store

function store (site) {
  return function content (state, emitter, app) {
    state.content = { }

    objectKeys(site).forEach(function (path) {
      // set view and extend state
      var page = site[path]
      var view = views[page.view] || views.main
      state.content[page.url] = page

      app.route(page.url, function (state, emit) {
        return view(xtend(state, { page: page }), emit)
      })
    })
  }
}
