const path = require('path')
const server = require('./server')
const { getProjectPath, getComponent } = require('./target')
const { genTemplate } = require('./template')
const webpack = require('webpack')

const start = async (fileName) => {
  const componentPaths = getComponent(fileName)
  const targetProjectPath = await getProjectPath(componentPaths)

  // mock NODE_PATH to target the node_modules of the targeted component folder
  process.env.NODE_ENV = 'development'
  process.env.NODE_PATH = targetProjectPath

  // Retrieve webpack configuration from create-react-app
  const targetProjectWebpack = Object.assign(
    {},
    require(`${targetProjectPath}/node_modules/react-scripts/config/webpack.config.dev.js`) // eslint-disable-line
  )
  // FIXME: kriya : `${targetProjectPath}/webpack.config.js`
  // TODO: Ask user where is his webpack config

  // Override webpack config
  // entry
  targetProjectWebpack.entry = {
    bundle: [
      'webpack-hot-middleware/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, '..', '..', 'dist', 'gui.build.js'),
    ],
  }
  // plugins
  targetProjectWebpack.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, '..', '..', 'dist', 'component.js')]),
  ]
  // modules resolver fallback
  targetProjectWebpack.resolve = Object.assign({}, targetProjectWebpack.resolve, {
    modules: ['node_modules', path.resolve(__dirname, '..', '..', 'node_modules')],
  })
  // output
  targetProjectWebpack.output = {
    path: '/',
    filename: '[name].js',
    publicPath: 'http://localhost:8080/',
  }

  // Generate component template (targetting tested component)
  await genTemplate(componentPaths)

  // run webpack with overrided project configuration
  server.start(componentPaths, targetProjectWebpack)
}

module.exports = start
