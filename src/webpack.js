const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const { COMPONENT_ABSOLUTE_PATH, PORT } = require('./constants')

const getModules = async () => {
  const paths = []
  let previousPath = path.dirname(COMPONENT_ABSOLUTE_PATH)
  let files = await fs.readdirAsync(previousPath)

  // looking for the first directory with a 'package.json' file
  while (!files.includes('package.json')) {
    previousPath = path.resolve(previousPath, '..')
    files = await fs.readdirAsync(previousPath)
  }
  paths.push(`${previousPath}/node_modules`)
  paths.push(previousPath)

  // from the directory found (package.json one)
  // 1. looking for a 'src' directory
  if (files.includes('src')) paths.push(path.resolve(previousPath, 'src'))
  // 2. looking for a 'webpack.config.js' file
  // TODO : retrieve resolve from this configuration file
  // if (files.includes('webpack.config.js'))
  // 3. looking for a 'style' directory
  if (files.includes('styles')) paths.push(path.resolve(previousPath, 'styles'))

  return paths
}

const connect = async (app) => {
  // patch config
  config.resolve.modules = config.resolve.modules.concat(await getModules())

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
      serverSideRender: false,
    }
  ))
}

module.exports = {
  connect,
}
