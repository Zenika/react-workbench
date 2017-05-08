const log = require('loglevel')
const path = require('path')
const fs = require('fs')

const get = async (component) => {
  const paths = []
  let previousPath = component.path.absolute.dir
  let files = await fs.readdirAsync(previousPath)

  // looking for the first directory with a 'package.json' file
  while (!files.includes('package.json')) {
    previousPath = path.resolve(previousPath, '..')
    log.debug(`Looking for package.json into [${previousPath}]`)
    files = await fs.readdirAsync(previousPath)

    // basename is empty, we are at the file system root
    if (path.basename(previousPath) === '') {
      log.error('package.json not found, unable to identify project root')
      process.exit(1)
    }
  }

  // check if node_modules exists
  try {
    await fs.statAsync(`${previousPath}/node_modules`)
  } catch (ex) {
    if (ex.errno === -2) { // -2 is file not found
      log.error(`node_modules doesn't exist in [${previousPath}], please resolve dependencies`)
      process.exit(1)
    } else {
      throw ex
    }
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
