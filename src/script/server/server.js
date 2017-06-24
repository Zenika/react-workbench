const express = require('express')
const log = require('loglevel')
const { PORT, PUBLIC_FOLDER } = require('./constants')
const bundle = require('./bundle')
const api = require('./api')

const start = (state) => {
  const { webpackConfiguration, component } = state

  console.log({ webpackConfiguration })

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
