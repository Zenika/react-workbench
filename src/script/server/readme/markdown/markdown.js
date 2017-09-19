const { reducers } = require('../../../redux')
const { service } = require('../../props')

const generateTitle = name => `# ${name}`

const generateDescription = (description = '') => `
## description

> ${description}
`

const generateProp = (name, prop) => {
  const defaultValue = prop.defaultValue ? prop.defaultValue.value : ''
  return `\`${name}\` | ${prop.required} | \`${prop.type.name}\` | \`${defaultValue}\` | ${prop.description} \n`
}

const generateProps = (props) => {
  if (props) {
    const table = Object.keys(props)
      .reduce((a, b) => {
        return `${a}${generateProp(b, props[b])}`
      }, '')
    return `
## properties

props | required | type | default | description
------|----------|------|---------|-------------
${table}
`
  }
  return ''
}

const generate = () => async (dispatch, getState) => {
  const { name } = reducers.component.get()(getState())

  const docgen = await service.get()

  return `
${generateTitle(name)}

${generateDescription(docgen.description)}

${generateProps(docgen.props)}
`
}

module.exports = {
  generate,
}
