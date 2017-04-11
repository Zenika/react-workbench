const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')

const start = () => {
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/')
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler)
  server.listen(8080)
}

module.exports = {
  start,
}
