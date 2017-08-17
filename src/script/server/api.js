const bodyParser = require('body-parser')
const { reducers, connect } = require('../redux')
const connectServices = require('./connect')
const debug = require('./debug')
const preview = require('./preview')
const props = require('./props')
const readme = require('./readme')
const screenshot = require('./screenshot')
const state = require('./state')

const api = app => (dispatch, getState) => {
  // config
  const { API_BASE_CONTEXT } = reducers.config.get()(getState())

  // bodyparsing
  app.use(API_BASE_CONTEXT, bodyParser.json())
  app.use(API_BASE_CONTEXT, bodyParser.text())

  // connects interfaces
  connectServices(app, API_BASE_CONTEXT)([
    debug,
    preview,
    props,
    readme,
    screenshot,
    state,
  ])
}

module.exports = connect(api)
