const { COMPONENT_ABSOLUTE_PATH_DIR, PROJECT_CONFIG_DIR } = require('../../constants')

const NAME = 'state'
const DATABASE_PATH = `${COMPONENT_ABSOLUTE_PATH_DIR}/${PROJECT_CONFIG_DIR}/${NAME}.json`

module.exports = {
  NAME,
  DATABASE_PATH,
}
