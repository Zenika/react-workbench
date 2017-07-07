const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const connect = async (app, config) => {
  // webpack compiler
  const compiler = webpack(config)

  // add middleware
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    })
  )

  app.use(webpackHotMiddleware(compiler))
}

module.exports = {
  connect,
}
