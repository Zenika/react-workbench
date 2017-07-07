#!/usr/bin/env node --harmony

// Bluebird to the rescue (for all the project (script+server))
require('./config/bluebird')

// Run CLI
require('./cli')
