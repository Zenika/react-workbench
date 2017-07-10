const fs = require('fs')
const p = require('path')
const docgen = require('react-docgen')

const { indexResolver, componentResolver } = require('./resolvers')

const resolvePath = async (path) => {
  const extensions = ['.js', '.jsx', '']
  for (let i = 0; i < extensions.length; i += 1) {
    const newpath = path + extensions[i]
    try {
      const stats = await fs.statAsync(newpath)
      if (stats.isDirectory()) {
        return resolvePath(p.resolve(path, 'index'))
      }
      return newpath
    } catch (ex) {
      if (ex.errno !== -2) throw ex // -2 is file not found
    }
  }
  return null
}

const resolve = async (componentPath) => {
  const resolvedPath = await resolvePath(componentPath)
  const isIndex = /index\.jsx?$/.test(resolvedPath)
  const file = await fs.readFileAsync(resolvedPath, 'utf-8')

  try {
    return docgen.parse(file, isIndex ? indexResolver : componentResolver)
  } catch (ex) {
    if (ex.path) {
      const newPath = await resolvePath(p.resolve(componentPath, isIndex ? '.' : '..', ex.path))
      if (newPath) {
        return resolve(newPath)
      }
    }
    throw ex
  }
}

module.exports = {
  resolve,
}
