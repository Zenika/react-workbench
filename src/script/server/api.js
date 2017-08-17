const bodyParser = require('body-parser')
const { reducers, connect } = require('../redux')
const connectResource = require('./connect')
const debug = require('./debug')
const preview = require('./preview')
const props = require('./props')
const readme = require('./readme')
const state = require('./state')

const api = app => (dispatch, getState) => {
  // config
  const { API_BASE_CONTEXT } = reducers.config.get()(getState())

  // bodyparsing
  app.use(API_BASE_CONTEXT, bodyParser.json())
  app.use(API_BASE_CONTEXT, bodyParser.text())

  // connects interfaces
  connectResource(app, API_BASE_CONTEXT)(debug.api)
  connectResource(app, API_BASE_CONTEXT)(preview.api)
  connectResource(app, API_BASE_CONTEXT)(props.api)
  connectResource(app, API_BASE_CONTEXT)(readme.api)
  connectResource(app, API_BASE_CONTEXT)(state.api)
}

module.exports = connect(api)
