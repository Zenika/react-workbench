const connect = require('./connect')
const reducers = require('./reducers')
const store = require('./store')

module.exports = {
  ...connect,
  reducers,
  store,
}
