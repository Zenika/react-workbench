const path = require('path')

module.exports = {
  PORT: process.env.PORT || 8080,
  PUBLIC_FOLDER: path.resolve(__dirname, '..', '..', '..', 'public'),
}
