const reducers = require('../../../../../redux/reducers')
const docgen = require('../docgen')

const generateTitle = name => `# ${name}`

const generateDescription = (description = '') => `> ${description}`

const generateProp = (name, prop) => {
  return `${name}|${prop.required}|${prop.type.name}|${prop.description}\n`
}

const generateProps = (props) => {
  if (props) {
    const table = Object.keys(props)
      .reduce((a, b) => {
        return `${a}${generateProp(b, props[b])}`
      }, '')
    return `
      props|required|type|description
      -----|--------|----|-----------
      ${table}
    `
  }
  return ''
}

module.exports = () => async (dispatch, getState) => {
  const doc = await docgen()(dispatch, getState)
  const { name } = reducers.component.get()(getState())

  return `
${generateTitle(name)}

${generateDescription(doc.description)}

${generateProps(doc.props)}
`
}
