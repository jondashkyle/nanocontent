module.exports = {
  reservedKeys: ['files', 'pages', 'url', 'name', 'path'],
  ignore: /(^[.#]|(?:__|~)$)/,
  encoding: 'utf8',
  file: 'index.txt',
  filetypes: {
    asset: ['.css', '.js'],
    archive: ['.zip'],
    audio: ['.mp3', '.wav', '.aiff'],
    document: ['.pdf'],
    image: ['.gif', '.jpg', '.jpeg', '.png', '.svg'],
    video: ['.mp4', '.mov'],
    font: ['.ttf', '.otf', '.woff', '.woff2']
  }
}
