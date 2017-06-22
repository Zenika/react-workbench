// Inspired from https://github.com/pimterry/loglevel/wiki
const log = require('loglevel')
const chalk = require('chalk')

// default logLevel, it can be changed with command line --debug
log.setLevel('info')

const getColorFromMethodName = (methodName) => {
  switch (methodName) {
    case 'trace': return chalk.grey
    case 'debug': return chalk.blue
    case 'warn': return chalk.yellow
    case 'error': return chalk.red
    case 'log':
    default: return chalk.white
  }
}

// loglevel Plugin to create colorfull log output using 'chalk'
const originalFactory = log.methodFactory
log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName)

  const methodMsg = chalk.bold.grey(`[${methodName.toUpperCase()}]`)

  return (message) => {
    rawMethod(`${methodMsg} ${getColorFromMethodName(methodName)(message)}`)
  }
}

log.setLevel(log.getLevel())

module.exports = log
