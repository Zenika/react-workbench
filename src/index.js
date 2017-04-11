#!/usr/bin/env node

const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const webpackDevServer = require('./webpack')

const getDirectories = async (filePath) => {
  const paths = []
  let previousPath = path.dirname(filePath)
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

const start = async (component) => {
  // 1. Read the template file
  const filePath = path.resolve(__dirname, 'template.jsx')
  const template = await fs.readFileAsync(filePath, 'utf-8')

  // 2. Replace what needs to be replaced
  const componentPath = path.resolve(process.env.PWD, component)
  const relativeComponentPath = path.relative(__dirname, componentPath)
  const appFileContent = template.replace('/* react-workbench-insert import */', relativeComponentPath)

  // 3. Write it into a tmp folder
  // 3.a Create the tmp folder
  const output = { dir: path.resolve(__dirname, '..', 'tmp'), file: 'index.jsx' }
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

  // 4. Start webpack-dev-server
  // retrieve important directories and files (module, source, webpack conf, etc)
  // and start the server
  webpackDevServer.start(await getDirectories(componentPath))
}

start(process.argv[2])
