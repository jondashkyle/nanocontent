var test = require('ava')

var hypha = require('.')

test('readPageSync works', function (t) {
  var page = hypha.readPageSync('example/content/about')
  t.is(page.title, 'About')
  t.is(page.view, 'custom')
})

test('readPage works', async function (t) {
  var page = await hypha.readPage('example/content/about')
  t.is(page.title, 'About')
  t.is(page.view, 'custom')
})

test('readPageSync and readPage outputs are the same', async function (t) {
  var sync = hypha.readPageSync('example/content/about')
  var async = await hypha.readPage('example/content/about')
  t.deepEqual(sync, async)
})

test('readSiteSync works', function (t) {
  var site = hypha.readSiteSync('example/content')
  t.is(site['/'].title, 'Example')
  t.is(site['/about'].title, 'About')
})

test('readSiteSync and readSite outputs are the same', async function (t) {
  var sync = hypha.readSiteSync('example/content')
  var async = await hypha.readSiteSync('example/content')
  t.deepEqual(sync, async)
})
