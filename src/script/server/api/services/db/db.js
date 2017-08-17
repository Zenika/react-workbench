const path = require('path')
const fs = require('fs')
const reducers = require('../../../../redux/reducers')

const init = () => (dispatch, getState) => {
  const component = reducers.component.get()(getState())
  const projectPath = component.path.absolute.workbench
  const filePath = path.resolve(projectPath, `${component.name}.json`)

  const createDir = async () => {
    try {
      await fs.mkdirAsync(projectPath)
    } catch (ex) {
      if (ex.errno !== -17) throw ex // -17 is directory exist
    }
  }

  const write = async (data = []) => {
    await createDir()

    await fs.writeFileAsync(filePath, JSON.stringify(data))

    return data
  }

  const read = async () => {
    await createDir()

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
    await createDir()

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
