const fs = require('fs')
const path = require('path')

const ls = async (entryPath) => {
  const files = await fs.readdirAsync(entryPath)

  const statsFiles = files.map(async (fullname) => {
    const stats = await fs.statAsync(path.resolve(entryPath, fullname))
    const ext = path.extname(fullname)
    const name = path.basename(fullname, ext)

    return Object.assign(
      {},
      {
        fullname,
        name,
        ext,
        isDirectory: stats.isDirectory(),
      },
      stats
    )
  })

  return Promise.all(statsFiles)
}

module.exports = {
  ls,
}
