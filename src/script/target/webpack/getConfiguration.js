const overrideConfiguration = require('./overrideConfiguration')
const getRaw = require('./getRaw')
const setEnv = require('./setEnv')

module.exports = async (state, callbacks) => {
  let innerState = {
    ...state,
    projectPath: await callbacks.getProjectPath(state),
  }

  // mock NODE_PATH to target the node_modules of the targeted component folder
  setEnv(innerState)
  // retrieve webpack configuration
  innerState = { ...innerState, raw: getRaw(innerState) }
  // override webpack config
  innerState = { ...innerState, config: overrideConfiguration(innerState) }

  return innerState.config
}
