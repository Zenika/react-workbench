const store = require('./store')

const connect = func => (...args) => func(...args)(store.dispatch, store.getState)
const connectAll = object =>
  Object
    .keys(object)
    .map(key => ({ [key]: connect(object[key]) }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})

module.exports = {
  connect,
  connectAll,
}

