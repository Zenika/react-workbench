#!/usr/bin/env node

// Bluebird to the rescue (for all the project (script+server))
require('./bluebird')

// Script can continue like nothing happens
const fs = require('fs')
const path = require('path')
const { COMPONENT_ABSOLUTE_PATH } = require('../constants')
const server = require('../server')

const start = async () => {
  // 1. Read the template file
  const filePath = path.resolve(__dirname, 'template.jsx')
  const template = await fs.readFileAsync(filePath, 'utf-8')

  // 2. Replace what needs to be replaced
  const output = { dir: path.resolve(__dirname, '..', '..', 'tmp'), file: 'index.jsx' }
  const appFileContent = template.replace(
    '/* react-workbench-insert import */',
    path.relative(output.dir, COMPONENT_ABSOLUTE_PATH) // eslint-disable-line comma-dangle
  )

  // 3. Write it into a tmp folder
  // 3.a Create the tmp folder
  try {
    await fs.mkdirAsync(output.dir)
  } catch (ex) {
    if (ex.errno !== -17) { // -17 is directory already exists
      throw ex
    }
  }
  // 3.b Write file
  const fullpath = path.resolve(output.dir, output.file)
  await fs.writeFileAsync(fullpath, appFileContent)

  // 4. Start webpack-dev-server
  server.start()
}

start()
