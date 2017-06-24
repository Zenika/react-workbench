const overrideConfiguration = require('./overrideConfiguration')
const getRaw = require('./getRaw')
const setEnv = require('./setEnv')

module.exports = async (state, callbacks) => {
  let innerState = Object.assign({}, state, {
    projectPath: await callbacks.getProjectPath(state),
  })

  // mock NODE_PATH to target the node_modules of the targeted component folder
  setEnv(innerState)
  // retrieve webpack configuration
  innerState = Object.assign({}, innerState, { raw: getRaw(innerState) })
  // override webpack config
  innerState = Object.assign({}, innerState, { config: overrideConfiguration(innerState) })

  return innerState.config
}
