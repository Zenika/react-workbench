const { NAME } = require('./constants')
const ddb = require('../../ddb')(NAME)

const create = async (state) => {
  // TODO : flow control of state ?
  await ddb.append(state)
}

module.exports = {
  create,
}
