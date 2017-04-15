const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const modules = require('./modules')

const connect = async (app) => {
  // patch config
  config.resolve.modules = config.resolve.modules.concat(await modules.get())

  // webpack compiler
  const compiler = webpack(config)

  // get ouput filename (js bundle)
  const { filename } = config.output

  // add middleware
  app.use(webpackMiddleware(
    compiler,
    {
      contentBase: __dirname,
      lazy: true,
      filename,
    }  // eslint-disable-line comma-dangle
  ))
}

module.exports = {
  connect,
}
