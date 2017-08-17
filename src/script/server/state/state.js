const { reducers, connect } = require('../../redux')
const db = require('../db')

const getFileName = connect(() => (dispatch, getState) => {
  const component = reducers.component.get()(getState())
  return `${component.name}.json`
})

const create = state => async () => {
  await db().write(getFileName(), state)
}

const read = () => async () => {
  return (await db().read(getFileName())) || {}
}

module.exports = {
  create,
  read,
}
