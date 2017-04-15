const path = require('path')
const fs = require('fs')

const COMPONENT = process.argv[2]
const COMPONENT_ABSOLUTE_PATH = path.resolve(process.env.PWD, COMPONENT)
const COMPONENT_ABSOLUTE_PATH_DIR = fs.lstatSync(COMPONENT_ABSOLUTE_PATH).isDirectory() ?
  COMPONENT_ABSOLUTE_PATH :
  path.dirname(COMPONENT_ABSOLUTE_PATH)

module.exports = {
  COMPONENT,
  COMPONENT_ABSOLUTE_PATH,
  COMPONENT_ABSOLUTE_PATH_DIR,
  API_BASE_CONTEXT: '/api', // needed for IHM and API
}
