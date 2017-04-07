#!/usr/bin/env node

const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const start = async (component) => {
  // 1. Read the template file
  const filePath = path.resolve(__dirname, 'template.jsx')
  const template = await fs.readFileAsync(filePath, 'utf-8')

  // 2. Replace what needs to be replaced
  const componentPath = path.relative(__dirname, path.resolve(process.env.PWD, component))
  const appFileContent = template.replace('/* react-workbench-insert import */', componentPath)

  // 3. Print it
  console.log(appFileContent)
}

start(process.argv[2])
