const { uniq } = require('trampss-redux-factory')

module.exports = {
  component: uniq('component'),
  project: uniq('project'),
  config: uniq('config'),
}
