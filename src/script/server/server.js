const path = require('path')
const express = require('express')
const log = require('loglevel')
const bundle = require('./bundle')
const api = require('./api')

const PORT = (process.env.PORT || 8080)
const PUBLIC_FOLDER = path.resolve(__dirname, '..', '..', '..', 'public')

const start = (state) => {
  const { webpackConfiguration, component } = state

  // create a new express server
  const app = express()

  // serve static files
  app.use(express.static(PUBLIC_FOLDER))

  // serve webpack bundle
  bundle.connect(app, webpackConfiguration)

  // serve api
  api.connect(app, component)

  // listen
  app.listen(PORT, () => {
    log.info(`Listen to localhost:${PORT}`)
  })
}

module.exports = {
  start,
}
