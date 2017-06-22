const { NAME } = require('./constants')
const db = require('../../db')(NAME)

const create = async (state) => {
  await db.append(state)
}

const read = async () => (await db.read()) || []

module.exports = {
  create,
  read,
}
