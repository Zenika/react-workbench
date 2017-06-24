const server = require('./server')
const { getComponent, getWebpackConfiguration } = require('./target')
const { genTemplate } = require('./template')

const start = async (state) => {
  let innerState = {
    component: getComponent(state),
  }

  // retrieve webpack configuration to run
  innerState = Object.assign({}, innerState, {
    webpackConfiguration: await getWebpackConfiguration(innerState),
  })

  // generate component template (targetting tested component)
  await genTemplate(innerState)

  // run webpack with overrided project configuration
  server.start(innerState)
}

module.exports = start
