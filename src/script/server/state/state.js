const { reducers, connect } = require('../../redux')
const db = require('../db')

const DEFAULT_STATE_NAME = 'default'

const getFileName = connect(name => (dispatch, getState) => {
  const component = reducers.component.get()(getState())
  return `${component.name}.${name}.json`
})

const create = (state, name = DEFAULT_STATE_NAME) => async () => {
  await db().write(getFileName(name), { ...state, name })
}

const read = (name = DEFAULT_STATE_NAME) => async () => {
  return (await db().read(getFileName(name))) || {}
}

const list = () => async () => {
  // read dir
  const files = await db().list()

  // read states
  return Promise
    .all(files.map(file => db().read(file)))
}

module.exports = {
  create,
  read,
  list,
}
