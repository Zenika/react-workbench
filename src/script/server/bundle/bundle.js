const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const projectStore = require('../../redux/reducers/project')

module.exports = app => (dispatch, getState) => {
  const { webpack: { config } } = projectStore.get()(getState())

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
