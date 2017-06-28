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
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: true,
    })
  )

  app.use(
    webpackHotMiddleware(compiler, {
      heartbeat: 2000,
    })
  )
}

module.exports = {
  connect,
}
