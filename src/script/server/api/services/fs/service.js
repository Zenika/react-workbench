const fs = require('fs')
const path = require('path')

const statFile = (fullpath, stats, content) => Object.assign(
  {},
  {
    fullname: path.basename(fullpath),
    ext: path.extname(fullpath),
    isDirectory: stats.isDirectory(),
    content: JSON.stringify(content),
  },
  stats
)

const ls = async (entryPath) => {
  const files = await fs.readdirAsync(entryPath)

  const statsFiles = files.map(async (fullname) => {
    const fullpath = path.resolve(entryPath, fullname)
    const stats = await fs.statAsync(entryPath)
    return statFile(fullpath, stats)
  })

  return Promise.all(statsFiles)
}

const get = async (entryPath) => {
  const stats = await fs.statAsync(entryPath)
  if (stats.isDirectory()) {
    // list folder content
    return ls(entryPath)
  }
  // return content of the file
  const content = await fs.readFileAsync(entryPath, 'utf-8')
  return statFile(entryPath, stats, content)
}

const save = async (entryPath, content) => {
  await fs.writeFileAsync(entryPath, content)
}

module.exports = {
  get,
  save,
}
