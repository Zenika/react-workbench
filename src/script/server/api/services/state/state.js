const db = require('../db')

const create = async (state) => {
  await db().write(state)
}

const read = async () => (await db().read()) || {}

module.exports = {
  create,
  read,
}
