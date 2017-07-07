const server = require('./server')
const { getComponent, getProjectPath } = require('./path')
const { getWebpackConfiguration } = require('./target')
const { genTemplate } = require('./template')

const start = async (state) => {
  let innerState = { ...state }

  // get some paths
  innerState = { ...innerState, component: getComponent(innerState) }
  innerState = { ...innerState, projectPath: await getProjectPath(innerState) }

  // retrieve webpack configuration to run
  innerState = {
    ...innerState,
    webpackConfiguration: await getWebpackConfiguration(innerState),
  }

  // generate component template (targetting tested component)
  await genTemplate(innerState)

  // run webpack with overrided project configuration
  server.start(innerState)
}

module.exports = start
