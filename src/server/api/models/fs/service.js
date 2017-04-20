const fs = require('fs')
const path = require('path')

const ls = async (entryPath) => {
  const files = await fs.readdirAsync(entryPath)

  const statsFiles = files.map(async (name) => {
    const stats = await fs.statAsync(path.resolve(entryPath, name))

    if (stats.isDirectory()) return `${name}/`
    return name
  })

  return Promise.all(statsFiles)
}

module.exports = {
  ls,
}
