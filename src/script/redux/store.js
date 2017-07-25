const path = require('path')
const { createStore, combineReducers } = require('redux')

// reducers
const reducers = require('./reducers')

// store
const store = createStore(combineReducers({ ...reducers }))

// hardcoded config
store.dispatch(reducers.config.set({
  API_BASE_CONTEXT: '/api',
  PORT: process.env.PORT || 8080,
  PUBLIC_FOLDER: path.resolve(__dirname, '..', '..', '..', 'public'),
}))

module.exports = store
