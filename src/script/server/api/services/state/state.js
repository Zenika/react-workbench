const reducers = require('../../../../redux/reducers')
const { connect } = require('../../../../redux/connect')
const db = require('../db')

const getFileName = connect(() => (dispatch, getState) => {
  const component = reducers.component.get()(getState())
  return `${component.name}.json`
})

const create = async (state) => {
  await db().write(getFileName(), state)
}

const read = async () => {
  return (await db().read(getFileName())) || {}
}

module.exports = {
  create,
  read,
}
