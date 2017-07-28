const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const reducers = require('../../redux/reducers')

module.exports = app => (dispatch, getState) => {
  const { webpack: { config } } = reducers.project.get()(getState())

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
