const path = require('path')
const server = require('./server')
const { getProjectPath, getComponent } = require('./target')
const { genTemplate } = require('./template')

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
  targetProjectWebpack.entry = { bundle: path.resolve(__dirname, '..', '..', 'dist', 'gui.build.js') }
  // output
  targetProjectWebpack.output = {
    path: path.resolve('..', '..', 'public'),
    filename: '[name].js',
    publicPath: '/',
  }

  // Generate component template (targetting tested component)
  await genTemplate(componentPaths)

  // run webpack with overrided project configuration
  server.start(componentPaths, targetProjectWebpack)
}

module.exports = start
