const path = require('path')
const express = require('express')
const { PORT } = require('./constants')
const webpack = require('./webpack')

const start = () => {
  // Create a new express server
  const app = express()

  // serve static files
  app.use(express.static(path.resolve(__dirname, '..', 'public')))

  // serve webpack
  webpack.connect(app)

  // listen
  app.listen(PORT, () => {
    // FIXME : delete this eslint-disable
    // eslint-disable-next-line no-console
    console.log(`Listen to localhost:${PORT}`)
  })
}

module.exports = {
  start,
}
