const fs = require('fs')
const reducers = require('../../../redux/reducers')

const init = name => (dispatch, getState) => {
  const projectPath = reducers.project.get()(getState()).path
  const filePath = `${projectPath}/${name}.json`

  const write = async (data = []) => {
    // create configuration directory
    try {
      await fs.mkdirAsync(projectPath)
    } catch (ex) {
      if (ex.errno !== -17) throw ex // -17 is directory exist
    }

    // write data into directory
    await fs.writeFileAsync(filePath, JSON.stringify(data))

    return data
  }

  const read = async () => {
    let content

    try {
      const fileContent = await fs.readFileAsync(filePath)
      if (fileContent) {
        content = JSON.parse(fileContent)
      }
    } catch (ex) {
      if (ex.errno !== -2) throw ex // -2 is file not found
    }

    return content
  }

  const append = async (data = []) => {
    const content = (await read()) || []

    const all = content.concat(data)
    await write(all)

    return all
  }

  return {
    read,
    write,
    append,
  }
}

module.exports = init
