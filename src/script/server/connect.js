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
    log.error(ex.stack)
    res.status(500).send({ name, message })
  }
}

const connect = (app, subroute = '') => (service) => {
  const { method, path, handler } = service
  app[method](`${subroute}${subroute.length > 0 ? '/' : ''}${path}`, errorHandler(handler))
}

const connectAll = (app, subroute = '') => object => (
  Object.keys(object)
    .map(key => ({ [key]: connect(app, subroute)(object[key]) }))
    .reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {},
    )
)

const connectServices = (app, subroute) => (services) => {
  services.forEach(service => connectAll(app, subroute)(service.api))
}

module.exports = connectServices
