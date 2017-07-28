const reducers = require('../../redux/reducers')
const setEnv = require('./setEnv')
const getRaw = require('./getRaw')
const override = require('./override')

module.exports = () => async (dispatch, getState) => {
  const { path } = reducers.project.get()(getState())

  // mock NODE_PATH to target the node_modules of the targeted component folder
  setEnv(path)

  // retrieve webpack configuration
  const raw = getRaw(path)
  const webpack = {
    raw,
    config: override(raw),
  }

  dispatch(reducers.project.update({ webpack }))
}
