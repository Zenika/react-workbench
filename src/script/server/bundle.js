const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')

const connect = async (app, config) => {
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
    }
  ))
}

module.exports = {
  connect,
}
