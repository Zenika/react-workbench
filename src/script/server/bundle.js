const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const connect = async (state, app) => {
  const { webpackConfiguration } = state

  // webpack compiler
  const compiler = webpack(webpackConfiguration)

  // add middleware
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfiguration.output.publicPath,
    })
  )

  app.use(webpackHotMiddleware(compiler))
}

module.exports = {
  connect,
}
