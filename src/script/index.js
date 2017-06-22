#!/usr/bin/env node

// Bluebird to the rescue (for all the project (script+server))
require('./config/bluebird')

// Run CLI
require('./cli')
