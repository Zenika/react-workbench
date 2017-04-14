const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { COMPONENT_ABSOLUTE_PATH_DIR } = require('../constants')

const get = async () => {
  const paths = []
  let previousPath = COMPONENT_ABSOLUTE_PATH_DIR
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

module.exports = {
  get,
}
