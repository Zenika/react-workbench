const { createStore, combineReducers } = require('redux')

// reducers
const component = require('./reducers/component')
const project = require('./reducers/project')

module.exports = createStore(
  combineReducers({
    component,
    project,
  }),
)
