const log = require('loglevel')

const errorHandler = callback => async (req, res, ...args) => {
  try {
    const content = await callback(req, res, ...args)
    if (content) {
      res.send(content)
    } else {
      res.sendStatus(204)
    }
  } catch (ex) {
    const { name, message } = ex
    log.error(ex)
    res.status(500).send({ name, message })
  }
}

const connect = (app, subroute = '') => (resource) => {
  app[resource.method](`${subroute}${resource.path}`, errorHandler(resource.handler))
}

const connectAll = (app, subroute = '') => object => (
  Object.keys(object)
    .map(key => ({ [key]: connect(app, subroute)(object[key]) }))
    .reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {},
    )
)

module.exports = connectAll
