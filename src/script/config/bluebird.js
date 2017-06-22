global.Promise = require('bluebird')
Promise.promisifyAll(require('fs'))
