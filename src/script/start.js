const fs = require('fs')
const path = require('path')
const server = require('../server')
const getProjectPath = require('./getProjectPath')

const getComponent = (fileName) => {
  const name = path.basename(fileName)
  const absolute = path.resolve(process.env.PWD, fileName)
  const dir = fs.lstatSync(absolute).isDirectory() ? absolute : path.dirname(absolute)

  return {
    name,
    path: {
      absolute: {
        dir,
        full: path.resolve(dir, name),
      },
    },
  }
}

const genTemplate = async (component) => {
   // 1. Read the template file
  const filePath = path.resolve(__dirname, 'template.js')
  const template = await fs.readFileAsync(filePath, 'utf-8')

  // 2. Get relative path
  const output = { dir: path.resolve(__dirname, '..', '..', 'public'), file: 'component.js' }
  let relativePath = path.relative(output.dir, component.path.absolute.full)

  // 2bis -
  // this handle the case of index.jsx (template) and tested component sharing the same directory.
  // in this case the relative path is <testedComponent> without '/' wich is an absolute import
  // so we force it to a relative import by adding './'  : './<testedComponent'
  relativePath = relativePath.includes('/') ?
    relativePath // relative path is also a relative import, that's ok
    : `./${relativePath}` // relative path is an absolute import : force the relative import

  // 2. Replace what needs to be replaced
  const appFileContent = template.replace(
    '/* react-workbench-insert import */',
     relativePath // eslint-disable-line comma-dangle
  )

  // 3. Write it into a tmp folder
  // 3.a Create the tmp folder
  try {
    await fs.mkdirAsync(output.dir)
  } catch (ex) {
    if (ex.errno !== -17) { // -17 is directory already exists
      throw ex
    }
  }
  // 3.b Write file
  const fullpath = path.resolve(output.dir, output.file)
  await fs.writeFileAsync(fullpath, appFileContent)
}

const start = async (fileName) => {
  const componentPaths = getComponent(fileName)
  const targetProjectPath = await getProjectPath(componentPaths)

  // identifier la configuration webpack.config.js
    // soit via react-scripts
    // FIXME
    // soit via webpack.config.js (à la racine)
      // changer de contexte d'excution (dans le projet avec package.json)

  process.env.NODE_ENV = 'development'
  process.env.NODE_PATH = targetProjectPath
  const targetProjectWebpack = Object.assign({}, require(`${targetProjectPath}/node_modules/react-scripts/config/webpack.config.dev.js`)) // eslint-disable-line
  // kriya : const targetProjectWebpack = Object.assign({}, require(`${targetProjectPath}/webpack.config.js`)) // eslint-disable-line
  // soit demander via CLI à l'utilisateur
// changer la conf du webpack.config.js retrouvé
  // entry
  targetProjectWebpack.entry = { bundle: path.resolve(__dirname, '..', '..', 'gui.build.js') }
  // output
  targetProjectWebpack.output = {
    path: path.resolve('..', '..', 'public'),
    filename: '[name].js',
    publicPath: '/',
  }

  // template
  await genTemplate(componentPaths)

  // run webpack-dev-server
  server.start(componentPaths, targetProjectWebpack)
}


const start2 = async (fileName) => {
  // [x] retrouver le projet du composant
  const componentPaths = getComponent(fileName)
  const targetProjectPath = await getProjectPath(componentPaths)

  // identifier la configuration webpack.config.js
    // soit via react-scripts
    // FIXME
    // soit via webpack.config.js (à la racine)
      // changer de contexte d'excution (dans le projet avec package.json)

    process.env.NODE_ENV = 'production'
    process.env.NODE_PATH = targetProjectPath
    const targetProjectWebpack = Object.assign({}, require(`${targetProjectPath}/node_modules/react-scripts/config/webpack.config.prod.js`)) // eslint-disable-line
    // soit demander via CLI à l'utilisateur
  // changer la conf du webpack.config.js retrouvé
    // entry
    targetProjectWebpack.entry = { testedComponent: componentPaths.path.absolute.full }
    // output
    targetProjectWebpack.output =  {
      path: path.resolve(__dirname, '..', '..', 'tmp'),
      filename: '[name].js',
      publicPath: '/'
    }

  // executer webpack -p du projet testé
  require('webpack')(targetProjectWebpack, () => { console.log('yeah') }).run(() => { console.log('coucou') })

  // changer le contexte sur react-workbench
  process.env.NODE_PATH = path.resolve(__dirname, '..', '..')

  // executer notre webpack
  server.start(componentPaths)
}

module.exports = start
