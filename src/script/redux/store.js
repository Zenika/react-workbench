const { createStore, combineReducers } = require('redux')

// reducers
const reducers = require('./reducers')

module.exports = createStore(
  combineReducers({ ...reducers }),
)
