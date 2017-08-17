const { NAME } = require('./constants')
const db = require('../db')

const create = async (state) => {
  await db(NAME).write(state)
}

const read = async () => (await db(NAME).read()) || {}

module.exports = {
  create,
  read,
}
