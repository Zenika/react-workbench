#!/usr/bin/env node

const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const webpackDevServer = require('./webpack')

const start = async (component) => {
  // 1. Read the template file
  const filePath = path.resolve(__dirname, 'template.jsx')
  const template = await fs.readFileAsync(filePath, 'utf-8')

  // 2. Replace what needs to be replaced
  const componentPath = path.relative(__dirname, path.resolve(process.env.PWD, component))
  const appFileContent = template.replace('/* react-workbench-insert import */', componentPath)

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
  await fs.writeFileAsync(path.resolve(output.dir, output.file), appFileContent)

  // 4. Start webpack-dev-server
  webpackDevServer.start()
}

start(process.argv[2])
