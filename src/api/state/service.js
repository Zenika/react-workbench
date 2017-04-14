// TODO : these two lines are duplicate everywhere
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { COMPONENT_CONFIG_DIR } = require('../../constants')
const { DATABASE_PATH } = require('./constants')

// TODO : move "database" controle so it can be reused
const create = async (state) => {
  // TODO : flow control of state ?

  // read previous states
  let content = []
  try {
    content = JSON.parse(await fs.readFileAsync(DATABASE_PATH))
  } catch (ex) {
    if (ex.errno !== -2) throw ex // -2 is file not found
  }

  // add new state
  content = content.concat(state)

  // create configuration directory
  try {
    await fs.mkdirAsync(COMPONENT_CONFIG_DIR)
  } catch (ex) {
    if (ex.errno !== -17) throw ex // -17 is directory exist
  }

  // write states
  await fs.writeFileAsync(DATABASE_PATH, JSON.stringify(content))
}

module.exports = {
  create,
}
