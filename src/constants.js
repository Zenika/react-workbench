const path = require('path')

const PORT = 8080

const COMPONENT = process.argv[2]
const COMPONENT_ABSOLUTE_PATH = path.resolve(process.env.PWD, COMPONENT)
const COMPONENT_RELATIVE_PATH = path.relative(__dirname, COMPONENT_ABSOLUTE_PATH)

module.exports = {
  COMPONENT,
  COMPONENT_ABSOLUTE_PATH,
  COMPONENT_RELATIVE_PATH,
  PORT,
}
