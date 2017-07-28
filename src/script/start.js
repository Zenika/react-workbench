const server = require('./server')
const { processTarget } = require('./processTarget')

const start = async (path) => {
  // process target component (paths, webpack, template, etc)
  await processTarget(path)

  // run server (endpoints, webpack)
  await server.start()
}

module.exports = start
