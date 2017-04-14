const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const PORT = 8080

const PUBLIC_FOLDER = path.resolve(__dirname, '..', 'public')

const PROJECT_CONFIG_DIR = '.workbench'

const COMPONENT = process.argv[2]
const COMPONENT_ABSOLUTE_PATH = path.resolve(process.env.PWD, COMPONENT)
const COMPONENT_RELATIVE_PATH = path.relative(__dirname, COMPONENT_ABSOLUTE_PATH)
const COMPONENT_ABSOLUTE_PATH_DIR = fs.lstatSync(COMPONENT_ABSOLUTE_PATH).isDirectory() ?
  COMPONENT_ABSOLUTE_PATH :
  path.dirname(COMPONENT_ABSOLUTE_PATH)
const COMPONENT_CONFIG_DIR = `${COMPONENT_ABSOLUTE_PATH_DIR}/${PROJECT_CONFIG_DIR}`

const API_BASE_CONTEXT = '/api'

module.exports = {
  COMPONENT,
  COMPONENT_ABSOLUTE_PATH,
  COMPONENT_RELATIVE_PATH,
  COMPONENT_ABSOLUTE_PATH_DIR,
  COMPONENT_CONFIG_DIR,
  PORT,
  PUBLIC_FOLDER,
  PROJECT_CONFIG_DIR,
  API_BASE_CONTEXT,
}
