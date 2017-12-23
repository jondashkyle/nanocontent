var html = require('choo/html')

module.exports = view

function view (state, emit) {
  var page = state.page || { }
  return html`
    <body class="m0 ff-sans bgc-black fc-white">
      <div>custom ${page.name}</div>
      <a href="/">back</a>
    </body>
  `
}
