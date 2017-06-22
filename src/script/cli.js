const log = require('./config/loglevel')
const start = require('./start')

const argv = require('yargs')
  .usage('$0 [args] <path>')
  .option('debug', {
    description: 'Set log level to debug',
    default: false,
    type: 'boolean',
  })
  .check((a) => {
    if (a._.length === 1) return true
    throw Error('<path> param is not set')
  })
  .help()
  .argv

if (argv.debug) {
  log.setLevel('debug')
}

start(argv._[0])
