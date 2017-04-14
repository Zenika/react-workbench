#!/usr/bin/env node
const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { COMPONENT_RELATIVE_PATH } = require('./constants')
const server = require('./server')

const start = async () => {
  // 1. Read the template file
  const filePath = path.resolve(__dirname, 'template.jsx')
  const template = await fs.readFileAsync(filePath, 'utf-8')

  // 2. Replace what needs to be replaced
  const appFileContent = template.replace('/* react-workbench-insert import */', COMPONENT_RELATIVE_PATH)

  // 3. Write it into a tmp folder
  // 3.a Create the tmp folder
  const output = { dir: path.resolve(__dirname, '..', 'tmp'), file: 'index.jsx' }
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
