const { NAME } = require('./constants')
const ddb = require('../../ddb')(NAME)

const create = async (state) => {
  await ddb.append(state)
}

const read = async () => (await ddb.read()) || []

module.exports = {
  create,
  read,
}
